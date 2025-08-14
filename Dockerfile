FROM node:14


WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ENV SERVER_HOST=${SERVER_HOST}
EXPOSE 4000
CMD ["sh", "-c", "REACT_APP_SERVER_HOST=${SERVER_HOST} npm start"]