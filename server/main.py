from yookassa import Refund
from yookassa import Configuration
from yookassa import Payment
import uuid
from fastapi import FastAPI, Response
import os
app = FastAPI()

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