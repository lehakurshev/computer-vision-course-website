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
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443