FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

# Сбилдить образ - docker build -t <имя образа> .
# Запустить контейнер - docker run -d -p 4000:3000 <имя образа>
