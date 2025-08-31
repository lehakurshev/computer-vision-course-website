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
RUN mkdir -p /run && chown -R nginx:nginx /run && mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx && mkdir -p /etc/nginx/certs

# Set up permissions for Certbot logging
RUN chown -R nginx:nginx /var/log/letsencrypt

# Меняем владельца файлов на пользователя Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html

# Установка Certbot
RUN apk add --no-cache certbot certbot-nginx

# Запускаем Nginx в фоне чтобы certbot мог его использовать.  Это ВАЖНО.
# Также, запуск в фоне, иначе certbot не сможет его остановить/перезапустить
CMD nginx -g "daemon off;" & \
    sleep 5 && \
    certbot certonly --nginx --non-interactive --agree-tos --register-unsafely-without-email -d cvcourse.ru && \
    # Меняем владельца каталога с сертификатами на пользователя nginx после создания
    chown -R nginx:nginx /etc/letsencrypt && \
    nginx -s reload

# Меняем конфигурацию Nginx на SSL после получения сертификатов
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Возвращаемся к пользователю nginx
USER nginx

EXPOSE 80
EXPOSE 443

ARG VITE_SERVER_HOST
ENV VITE_SERVER_HOST=${VITE_SERVER_HOST}

# Команда для запуска Nginx
#CMD ["nginx", "-g", "daemon off;"]  Уже запустили выше
