FROM node:lts
WORKDIR /usr/src/app
COPY ./frontend.js .
COPY ./db.js .
RUN npm install kafkajs express mysql
CMD ["node", "./frontend.js"]
