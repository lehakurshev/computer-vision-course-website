from yookassa import Refund, Configuration, Payment
import uuid
from fastapi import FastAPI, Response, HTTPException, Body
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tinydb import TinyDB, Query

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
db = TinyDB('descriptions.json')
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

@app.post("/confirmation-token")
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
        "description": f"http://{os.getenv('SERVER_HOST')}:8000/description/{unique_id}"
    })

    return payment.confirmation.confirmation_token

@app.get("/description/{id}")
async def get_description(id: str):
    # Получение описания по уникальному идентификатору
    result = db.search(Description.id == id)
    
    if not result:
        raise HTTPException(status_code=404, detail="Description not found")

    return result[0]['description']

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