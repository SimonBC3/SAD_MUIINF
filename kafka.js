const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:29092", "0.0.0.0:29092"],
});

module.exports = kafka;
