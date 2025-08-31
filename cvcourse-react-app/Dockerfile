# --- Этап 1: Сборка React приложения ---
FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_SERVER_HOST
ENV VITE_SERVER_HOST=${VITE_SERVER_HOST}
RUN npm run build

# --- Этап 2: Подача статических файлов с Nginx ---
FROM nginx:stable-alpine

# Удаляем стандартную конфигурацию Nginx
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные статические файлы из этапа "builder"
COPY --from=builder /app/dist /usr/share/nginx/html

# Создаем необходимые директории и устанавливаем права
RUN mkdir -p /run && chown -R nginx:nginx /run && mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx && mkdir -p /etc/nginx/certs

# Меняем владельца файлов на пользователя Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html

# Установка Certbot
RUN apk add --no-cache certbot certbot-nginx

USER nginx

EXPOSE 80
EXPOSE 443

ARG VITE_SERVER_HOST
ENV VITE_SERVER_HOST=${VITE_SERVER_HOST}

# Команда для запуска Nginx и получения сертификатов
# CMD ["sh", "-c", "certbot certonly --nginx --non-interactive --agree-tos --register-unsafely-without-email -d cvcourse.ru && nginx -g 'daemon off;'"]