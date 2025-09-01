# payment_utils.py

from yookassa import Payment
import uuid
from typing import Tuple

def create_payment(amount: float, description: str) -> Tuple[str, str]:
    """
    Создает платеж в YooKassa и возвращает confirmation_token и payment_id.

    Args:
        amount: Сумма платежа.
        description: Описание платежа (должно включать уникальный идентификатор).

    Returns:
        Кортеж, содержащий confirmation_token и payment_id.

    Raises:
        Exception: Если не удалось создать платеж.  (Более конкретные исключения приветствуются)
    """

    try:
        payment = Payment.create({
            "amount": {
                "value": amount,
                "currency": "RUB"
            },
            "confirmation": {
                "type": "embedded"
            },
            "capture": False,
            "description": description  # Используем переданное описание
        })

        return payment.confirmation.confirmation_token, payment.id # Возвращаем payment id

    except Exception as e:
        print(f"Ошибка при создании платежа: {e}")  # Логируйте ошибку для отладки
        raise  # Перебросьте исключение, чтобы вызывающая функция могла его обработать
