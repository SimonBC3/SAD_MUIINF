const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092", "0.0.0.0:29092"],
});

module.exports = kafka;
