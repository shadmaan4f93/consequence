FROM node:14

ENV NODE_ENV=production

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]