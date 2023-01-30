FROM node:lts
WORKDIR /usr/src/app
COPY ./frontend.js .
COPY ./kafka.js .
COPY ./db.js .
COPY ./keycloak-config.js .
RUN npm install kafkajs express mysql express-session keycloak-connect
CMD ["node", "./frontend.js"]
