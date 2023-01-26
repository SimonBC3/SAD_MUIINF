
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

app.post('/job', function(req,res) {

  console.log(req.body)
    //producer
    run(nJob, req.body.url, req.body.path, req.body.fileName).catch( error => { return res.status(500).send('Internal error!')})
    //uuid
    nJob++
    //answer to client
    return res.status(200).send('Petition sent!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//TODO: somewhere else and func imported
async function run(uuid, url, path, fileName){
  const producer = kafka.producer()
  await producer.connect()

  await producer.send({
    topic: 'users',
    messages: [
        { value: JSON.stringify({ uuid: `${uuid}`, 
                                  url: `${url}`, 
                                  path: `${path}`, 
                                  fileName:`${fileName}`
                                }) 
        },
    ],
})
}