const { Kafka } = require('kafkajs')
const { exec } = require('child_process')
const { stdout, stderr } = require('process')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    // Producing
    await producer.connect()    
    await producer.send({
        topic: 'users',
        messages: [
            { value: JSON.stringify({hello: 'hello kafka',
                            repository: 'https://github.com/SimonBC3/movies'})},
        ],
    })

    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'users', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            let jsonMessage = JSON.parse(message.value.toString())
            console.log(jsonMessage.repository)
            //execute(`git clone ${message.value.repository.toString()}`)
            //execute(`npm install`)
            //execute(`node ${message.value.executablePath}`)
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
}

function execute(order) {
    exec((order), (err, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
          }
        
          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }
        
          console.log(`stdout:\n${stdout}`);
    })   
}

run().catch(console.error)