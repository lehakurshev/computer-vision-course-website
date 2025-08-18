# Dockerfile

# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы в контейнер
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
ARG SERVER_HOST
ENV SERVER_HOST=${SERVER_HOST}
# Указываем команду для запуска приложения
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
