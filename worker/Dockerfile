FROM node:lts
WORKDIR /usr/src/app
COPY ./worker.js .
RUN npm install kafkajs
CMD ["node", "./worker.js"]
