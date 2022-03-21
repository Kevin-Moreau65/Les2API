FROM node:16-alpine

ADD . /app/

WORKDIR /app

RUN npm i

EXPOSE 4000

CMD npm run start
