const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092", "0.0.0.0:29092"],
});
const admin = kafka.admin();

async function setUp() {
  await admin.connect();

  let topics = await admin.listTopics();
  console.log(topics);

  if (topics.some((topic) => topic == "in")) {
    console.log('modifying topics')
    await modifyTopics(admin)
    await admin.disconnect()
    return;
  }

  console.log("creating topics");
  await admin.createTopics({
    validateOnly: false,
    waitForLeaders: true,
    timeout: 1000,
    topics: [
      {
        topic: "in",
        numPartitions: "2",
        replicationFactor: "2",
        replicaAssignment: [],
      },
    ],
  });
  await modifyTopics(admin)
  await admin.disconnect();
}

async function modifyTopics(admin) {
  await admin.createPartitions({
    topicPartitions: [{
      topic: 'in',
      count: '2'
    }]
  })
}

setUp();
module.exports = kafka;
