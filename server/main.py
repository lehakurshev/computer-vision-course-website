from yookassa import Refund
from yookassa import Configuration
from yookassa import Payment
import uuid
from fastapi import FastAPI, Response, HTTPException, Body
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    f"http://{os.getenv('SERVER_HOST')}",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Configuration.configure(os.getenv('YOOKASSA_SHOP_ID'), os.getenv('YOOKASSA_SHOP_SECRET'))

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
        # Если consultation_type не найден в словаре, возвращаем ошибку HTTP 400
        raise HTTPException(
            status_code=400,
            detail=f"Invalid consultation_type: '{form_values.consult}'.  Valid types are: {', '.join(CONSULTATION_TYPE_MAPPING.keys())}"
        )

    payment = Payment.create({
        "amount": {
            "value": value,
            "currency": "RUB"
        },
        "confirmation": {
            "type": "embedded"
        },
        "capture": False,
        "description": form_values
    })

    return payment.confirmation.confirmation_token


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