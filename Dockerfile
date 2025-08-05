FROM node:14


WORKDIR /app

COPY ["package.json", "package-lock.json", "yarn.lock", "tsconfig.json", "./"]
RUN npm install

COPY . .
EXPOSE 4000
CMD ["npm", "start"]
