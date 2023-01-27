FROM node:lts
WORKDIR /usr/src/app
COPY ./frontend.js .
COPY ./kafka.js .
RUN npm install kafkajs express
CMD ["node", "./frontend.js"]
