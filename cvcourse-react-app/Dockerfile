# --- Этап 1: Сборка React приложения ---
FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY ../const ./const
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
RUN mkdir -p /run && chown -R nginx:nginx /run && mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx

# Меняем владельца файлов на пользователя Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html

USER nginx

EXPOSE 80

ARG VITE_SERVER_HOST
ENV VITE_SERVER_HOST=${VITE_SERVER_HOST}
CMD ["nginx", "-g", "daemon off;"]
