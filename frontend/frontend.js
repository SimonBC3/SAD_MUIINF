const express = require("express");
const app = express();
const db = require("./../database/db.js");
const kafka = require("../kafka.js")
//const keycloak = require('./keycloak-config.js').initKeycloak()

const port = 3000;
var nJob = 0;

app.use(express.json());
//app.use(keycloak.middleware())

app.get("/:id", (req, res) => {
  if (req.params.id === "favicon.ico") return;

  res.send(`Hey id: ${req.params.id}`);
});

app.post("/job", function (req, res) {
  console.log(req.body);
  send(
    nJob,
    req.body.url,
    req.body.execPath,
    req.body.execName,
    req.body.args,
    req.body.outPath,
    req.body.outName
  ).catch((error) => {
    return res.status(500).send("Internal error!");
  });
  //uuid
  nJob++;

  return res.status(200).send("Petition sent!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  consumeAndInsert();
});

//TODO: somewhere else and func imported
async function send(uuid, url, execPath, execName, args, outPath, outName) {
  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: "in",
    messages: [
      {
        value: JSON.stringify({
          uuid: `${uuid}`,
          url: `${url}`,
          execPath: `${execPath}`,
          execName: `${execName}`,
          args: `${args}`,
          outPath: `${outPath}`,
          outName: `${outName}`,
        }),
      },
    ],
  });
}

async function consumeAndInsert() {
  const consumer = kafka.consumer({ groupId: "frontend-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "out", fromBeginning: false });
  console.log("Frontend listening to out topic");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
      let jsonMessage = JSON.parse(message.value.toString());

      try {
        query = `INSERT INTO db.Jobs (Uuid, Result) VALUES (${jsonMessage.uuid}, \"${jsonMessage.outMessage}\")`;
        db.query(query);
        console.log(`Inserted ${jsonMessage.uuid}, \"${jsonMessage.outMessage}`);
      } catch (error) {
        console.log(error);
      }
    },
  });
}
