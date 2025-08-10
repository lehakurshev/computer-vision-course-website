FROM node:14


WORKDIR /app

COPY ["package.json", "package-lock.json", "yarn.lock", "tsconfig.json", "./"]
RUN npm install

COPY . .
ENV SERVER_HOST=${SERVER_HOST}
EXPOSE 4000
CMD ["sh", "-c", "REACT_APP_SERVER_HOST=${SERVER_HOST} npm start"]