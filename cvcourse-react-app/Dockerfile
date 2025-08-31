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

# Копируем кастомную конфигурацию Nginx (без SSL)
COPY nginx/nginx.conf.no-ssl /etc/nginx/conf.d/default.conf

# Копируем собранные статические файлы из этапа "builder"
COPY --from=builder /app/dist /usr/share/nginx/html

# Создаем необходимые директории и устанавливаем права
RUN mkdir -p /run /var/log/letsencrypt && chown -R nginx:nginx /run /var/cache/nginx /etc/nginx/certs

# Set up permissions for Certbot logging
RUN chown -R nginx:nginx /var/log/letsencrypt
# Меняем владельца файлов на пользователя Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html

# Установка Certbot
RUN apk add --no-cache certbot certbot-nginx

# Run Certbot and reload Nginx *before* switching user
CMD nginx -g "daemon off;" & \
    sleep 10 && \
    certbot certonly --nginx --non-interactive --agree-tos --register-unsafely-without-email -d cvcourse.ru && \
    nginx -s reload

# Меняем конфигурацию Nginx на SSL после получения сертификатов
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Меняем владельца каталога с сертификатами на пользователя nginx
# Run chown command after copying the SSL config
# chown -R nginx:nginx /etc/letsencrypt && \

# Возвращаемся к пользователю nginx
USER nginx

EXPOSE 80
EXPOSE 443

ARG VITE_SERVER_HOST
ENV VITE_SERVER_HOST=${VITE_SERVER_HOST}

# Команда для запуска Nginx
#CMD ["nginx", "-g", "daemon off;"]  Уже запустили выше
