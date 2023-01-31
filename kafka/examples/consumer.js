const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:29092"],
});

const consumer = kafka.consumer({ groupId: "out-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "out", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
