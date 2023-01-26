const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
})

const producer = kafka.producer()

const run = async() => {

// admin.connect()
// admin.createTopics({
//         waitForLeaders: true,
//         topics: [
//             { topic: 'myRandomTopicString123' },
//         ],
//     })
    // Producing
await producer.connect()
 producer.send({
    topic: 'out',
    messages: [
        { value: 'producer KafkaJS user!' },
    ],
}).then(console.log)
}

run()