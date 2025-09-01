from yookassa import Refund, Configuration, Payment, Webhook
import uuid
from fastapi import FastAPI, Response, HTTPException, Body, Request, BackgroundTasks, status
from fastapi.responses import RedirectResponse
import os
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tinydb import TinyDB, Query
from typing import List, Dict, Any
import re
import time

import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Конфигурация YooKassa
Configuration.configure(os.getenv('YOOKASSA_SHOP_ID'), os.getenv('YOOKASSA_SHOP_SECRET'))


# Настройка базы данных TinyDB
db = TinyDB('/app/db_data/descriptions.json')
Description = Query()

# Чтение данных из файла consultations.json
with open('consultations.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Создание словаря CONSULTATION_TYPE_MAPPING
CONSULTATION_TYPE_MAPPING = {
    item['value']: f"{float(item['price']):.2f}" for item in data
}

class FormValues(BaseModel):
    consult: str
    lastName: str
    firstName: str
    messengerType: str
    messenger: str
    email: str

@app.post("/api/confirmation-token-and-description-id")
async def get_confirmation_token(form_values: FormValues = Body(...)):
    value = CONSULTATION_TYPE_MAPPING.get(form_values.consult)

    if value is None:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid consultation_type: '{form_values.consult}'. Valid types are: {', '.join(CONSULTATION_TYPE_MAPPING.keys())}"
        )

    # Генерация уникального идентификатора
    unique_id = str(uuid.uuid4())

    # Сохранение описания в базе данных
    db.insert({'id': unique_id, 'description': str(form_values)})

    # Создание платежа с использованием уникального идентификатора
    payment = Payment.create({
        "amount": {
            "value": value,
            "currency": "RUB"
        },
        "confirmation": {
            "type": "embedded"
        },
        "capture": False,
        "description": f"{unique_id}"
    })

    return (payment.confirmation.confirmation_token, unique_id)

@app.get("/api/description/{id}")
async def get_description(id: str):
    # Получение описания по уникальному идентификатору
    result = db.search(Description.id == id)
    
    if not result:
        raise HTTPException(status_code=404, detail="Description not found")

    return result[0]['description']


def get_paid_payments_description() -> List[str]:
    """Retrieves IDs of paid payments."""
    secure_payments_ids = []
    cursor = None

    while True:
        try:
            payments = Payment.list({"limit": 100, "cursor": cursor})
            # Фильтруем платежи по условию paid == true
            for payment in payments.items:
                if hasattr(payment, 'paid') and payment.paid:
                    secure_payments_ids.append(payment.description) # Store id

            # Если есть следующий курсор, продолжаем запросы
            if not payments.next_cursor:
                break
            cursor = payments.next_cursor

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return secure_payments_ids  # Return the list of IDs


def get_google_sheet(sheet_name: str):
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = gspread.service_account("auth.json", scope)
    sheet = creds.open(sheet_name).sheet1

    return sheet

def description_to_dict(description: str) -> Dict[str, str]:
    try:
        # Use regular expression to find key-value pairs
        matches = re.findall(r"(\w+)='([^']*)'", description)
        return dict(matches)
    except Exception:
        return {}

@app.get("/api/yookassa-resolver/{id}")
async def yookassa_resolver(id: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(save_description_to_sheet, id)
    return RedirectResponse(url=f"http://{os.getenv('SERVER_HOST')}", status_code=status.HTTP_303_SEE_OTHER)


async def save_description_to_sheet(id: str):
    """Saves the description of a payment with the given ID to a Google Sheet."""

    start_time = time.time()
    timeout = 2 * 60 * 60  # 2 часа в секундах
    retry_delay = 10  # 1 минута между попытками (можно настроить)
    
    while time.time() - start_time < timeout:
        paid_payment_ids = get_paid_payments_description()

        if id in paid_payment_ids:
            print(f"Payment ID '{id}' найден.")
            break  # ID найден, функция завершается успешно

        print(f"Payment ID '{id}' не найден. Повторная попытка через {retry_delay} секунд...")
        time.sleep(retry_delay)

    # 1. Check if the ID exists in paid payments
    paid_payment_ids = get_paid_payments_description()
    
    if id not in paid_payment_ids:
        print(f"Payment ID '{id}' not found in paid payments.")
        return

    # 2. Get the Google Sheet
    sheet = get_google_sheet(
        "computer-vision-course-website-paid-payments-descriptions"
    )

    # 3. Check if the ID already exists in the sheet
    existing_ids = sheet.col_values(1)  # Assuming ID is in the first column
    if id in existing_ids:
        print(f"Payment ID '{id}' already exists in the Google Sheet.")
        return


    # 4. Retrieve the description
    result = db.search(Description.id == id)  # Assuming Description model
    if not result:
        print(f"Description not found")
        return

    description = result[0]["description"]

    # 5. Parse the description string into a dictionary
    description_data = description_to_dict(description)

    # 6. Create a list of values to append to the sheet
    row_values = [id] + list(description_data.values())  # Add ID first, then values

    # Ensure the data does not contain newline or carriage return characters
    row_values = [str(value).replace('\n', ' ').replace('\r', ' ') for value in row_values]

    # 7. Append the row to the Google Sheet
    sheet.append_row(row_values)

    print(f"message: Description saved to Google Sheet, id: {id}")

# ===================================================================================

# Configuration.configure_auth_token('<Bearer Token>')

# Webhook.add({
#     "event": "payment.succeeded",
#     "url": f"https://{os.getenv('SERVER_HOST')}/api/yookassa-webhook"
# })

# Webhook.add({
#     "event": "payment.waiting_for_capture",
#     "url": f"https://{os.getenv('SERVER_HOST')}/api/yookassa-webhook"
# })

# @app.post('/api/yookassa-webhook')
# async def handle_payment(request: Request):
#     event_json = await request.json()
#     payment_id = event_json['object']['id']
#     user_id = event_json['object']['metadata']['user_id']
    
#     if event_json['event'] == 'payment.succeeded':

#         amount = event_json['object']['amount']['value']
#         payment_method_id = event_json['object']['payment_method']['id']
        
#         print(f"Платеж {payment_id} успешен! User: {user_id}, Amount: {amount}")

#         save_description_to_sheet(payment_id = event_json['object']['description'])
        

#     elif event_json['event'] == 'payment.waiting_for_capture':
#         Payment.capture(payment_id)
        
#     return {"status": "ok"}

# ===================================================================================


# @app.get("/all-payments")
# async def get_payments():
#     all_payments = []
#     cursor = None

#     while True:
#         try:
#             payments = Payment.list({"limit": 100, "cursor": cursor})
#             all_payments.extend(payments.items)

#             # Если есть следующий курсор, продолжаем запросы
#             if not payments.next_cursor:
#                 break
#             cursor = payments.next_cursor

#         except Exception as e:
#             raise HTTPException(status_code=500, detail=str(e))

#     return {"type": "list", "items": all_payments}
    



@app.get("/api/get-yookassa-widget")
async def get_yookassa_widget():
    return {}