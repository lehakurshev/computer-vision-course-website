from yookassa import Refund
from yookassa import Configuration
from yookassa import Payment
import uuid
from fastapi import FastAPI, Response
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    # os.getenv('SERVER_HOST'),
    'http://158.160.102.186/'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Configuration.configure(os.getenv('YOOKASSA_SHOP_ID'), os.getenv('YOOKASSA_SHOP_SECRET'))

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

@app.get("/confirmation-token")
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

    return payment.confirmation.confirmation_token
