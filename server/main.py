from yookassa import Refund, Configuration, Payment
import uuid
from fastapi import FastAPI, Response, HTTPException, Body
import os
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tinydb import TinyDB, Query
from typing import List, Dict, Any
import re

import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = FastAPI()

# Настройка CORS
origins = [
    f"http://{os.getenv('SERVER_HOST')}",
    f"http://{os.getenv('SERVER_HOST')}:80"
]
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

CONSULTATION_TYPE_MAPPING = {
    "assistant-20": "400.00",
    "assistant-60": "1000.00",
    "author-20": "1000.00",
}

class FormValues(BaseModel):
    consult: str
    lastName: str
    firstName: str
    messengerType: str
    messenger: str
    email: str

@app.post("/confirmation-token-and-description-id")
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

@app.get("/description/{id}")
async def get_description(id: str):
    # Получение описания по уникальному идентификатору
    result = db.search(Description.id == id)
    
    if not result:
        raise HTTPException(status_code=404, detail="Description not found")

    return result[0]['description']


@app.get("/paid-payments")
async def get_paid_payments():
    secure_payments = []
    cursor = None

    while True:
        try:
            payments = Payment.list({"limit": 100, "cursor": cursor})
            # Фильтруем платежи по условию paid == true
            for payment in payments.items:
                if hasattr(payment, 'paid') and payment.paid:
                    secure_payments.append({"description": payment.description})

            # Если есть следующий курсор, продолжаем запросы
            if not payments.next_cursor:
                break
            cursor = payments.next_cursor

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return secure_payments

def fix_json_like_string(input_string: str) -> str:

    json_string = input_string.replace("  ", "  \"")

    json_string = json_string.replace(": ", "\": \"")

    json_string = json_string.replace(",", "\",")


    json_string = json_string.replace("\"universe_domain\": \"googleapis.com", "\"universe_domain\": \"googleapis.com\"")
    return json_string


def get_google_sheet(sheet_name: str):
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = gspread.service_account("auth.json", scope)
    sheet = creds.open(sheet_name).sheet1

    return sheet

@app.get("/save-description-to-sheet/{id}")
async def save_description_to_sheet(id: str):
    # Получение описания по уникальному идентификатору
    result = db.search(Description.id == id)
    
    if not result:
        raise HTTPException(status_code=404, detail="Description not found")
    
    description = result[0]['description']
    
    # Запись описания в Google Таблицу
    sheet = get_google_sheet("computer-vision-course-website-paid-payments-descriptions")
    
    # Добавляем новую строку с описанием
    sheet.append_row([id, description])  # Здесь вы можете изменить, какие данные хотите записать
    
    return {"message": "Description saved to Google Sheet", "id": id}


@app.get("/all-payments")
async def get_payments():
    all_payments = []
    cursor = None

    while True:
        try:
            payments = Payment.list({"limit": 100, "cursor": cursor})
            all_payments.extend(payments.items)

            # Если есть следующий курсор, продолжаем запросы
            if not payments.next_cursor:
                break
            cursor = payments.next_cursor

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return {"type": "list", "items": all_payments}
    


# 
@app.get("/get-yookassa-widget")
async def get_yookassa_widget():
    payment = Payment.create({
        "amount": {
            "value": "2.00",
            "currency": "RUB"
        },
        "confirmation": {
            "type": "embedded"
        },
        "capture": False,
        "description": "Заказ №72"
    })

    # Чтение HTML-кода из файла
    file_path = os.path.join(os.path.dirname(__file__), 'yookassa.html')
    with open(file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Замена плейсхолдера на фактический токен подтверждения
    html_content = html_content.replace("$$$confirmation_token$$$", payment.confirmation.confirmation_token)

    return Response(content=html_content, media_type="text/html")