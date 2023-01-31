const { Kafka } = require("kafkajs");
const { exec } = require("child_process");
const fs = require("fs/promises");
const fsSync = require("fs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "worker-group" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "in", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });

      log(
        `partition: ${partition} \n offset: ${
          message.offset
        } \n value: ${message.value.toString()}`
      );

      let jsonMessage = JSON.parse(message.value.toString());

      await execute(`git clone ${jsonMessage.url} clone`);
      execute(`npm install`);
      //wait for the clone
      waiting(`./clone${jsonMessage.execPath}`, jsonMessage.execName);
      //readOutFile
      await execute(
        `node ./clone${jsonMessage.execPath}${jsonMessage.execName} ${jsonMessage.args}`
      );
      //wait for the outFile
      waiting(`.${jsonMessage.outPath}`, jsonMessage.outName);

      let outMessage = await read(
        `.${jsonMessage.outPath}`,
        jsonMessage.outName
      );
      await producer.connect();
      await producer.send({
        topic: "out",
        messages: [
          {
            value: JSON.stringify({
              uuid: `${jsonMessage.uuid}`,
              outMessage: `${outMessage}`,
            }),
          },
        ],
      });
      await execute(`rm -rf ./clone`);
      await execute("rm ." + jsonMessage.outPath + jsonMessage.outName);
    },
  });
};

function execute(order) {
  return new Promise((res) => {
    console.log("executing " + order);
    log("executing " + order);
    try {
      exec(order);
    } catch (error) {
      console.log(error);
    }
    res();
  });
}

async function read(path, fileName) {
  let data = "";
  try {
    data = await fs.readFile(`${path}${fileName}`, { encoding: "utf8" });
    console.log("success reading: " + data);
    log("success reading: " + data);
  } catch (error) {
    console.log(error);
  }
  return data;
}

function waiting(filePath, fileName) {
  let message = "looking for this file: " + filePath + fileName;
  console.log(message);
  log(message);
  while (!fsSync.existsSync(`${filePath}${fileName}`)) {
    setInterval(() => {
      return;
    }, 100);
  }
}

function log(message) {
  fsSync.appendFileSync("./worker.log", message + "\n", { flags: "a" });
}

run().catch(console.error);
