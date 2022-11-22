const express = require('express')
const app = express()
const port = 3000
const keycloak = require('./keycloak-config.js').initKeycloak()

app.use(express.json());
app.use(keycloak.middleware())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/post', keycloak.protect('user'), function(req,res) {
    console.log()
    console.log(req.body)
    
})