const express = require('express')
const app = express()
const port = 3000
//const keycloak = require('./keycloak-config.js').initKeycloak()
const kafka = require('./../kafka.js')

app.use(express.json());
//app.use(keycloak.middleware())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/work', function(req,res) {
    console.log()
    console.log(req.body)
    
    //productor
    run(req.body.url)
    //generar uuid = topic
})

async function run(url){
  const producer = kafka.producer()
  await producer.connect()

  await producer.send({
    topic: 'myRandomTopicString123',
    messages: [
        { value: url },
    ],
})
}