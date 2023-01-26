
const express = require('express')
const app = express()
const kafka = require('./../kafka.js')
//const keycloak = require('./keycloak-config.js').initKeycloak()

const port = 3000
var nJob = 0

app.use(express.json());
//app.use(keycloak.middleware())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/job', function (req, res) {
  console.log(req.body)
  send(nJob, req.body.url, req.body.execPath, req.body.execName, req.body.args, req.body.outPath, req.body.outName).catch(error => { return res.status(500).send('Internal error!') })
  //uuid
  nJob++

  return res.status(200).send('Petition sent!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//TODO: somewhere else and func imported
async function send(uuid, url, execPath, execName, args, outPath, outName) {
  const producer = kafka.producer()
  await producer.connect()

  await producer.send({
    topic: 'in',
    messages: [
      {
        value: JSON.stringify({
          uuid: `${uuid}`,
          url: `${url}`,
          execPath: `${execPath}`,
          execName: `${execName}`,
          args: `${args}`,
          outPath: `${outPath}`,
          outName: `${outName}`
        })
      },
    ],
  })
}