FROM node:16-alpine

WORKDIR /app

COPY src/. .

RUN npm install


EXPOSE 3000

CMD node server.js