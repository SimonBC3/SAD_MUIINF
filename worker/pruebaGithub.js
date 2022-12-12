const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
})

const admin = kafka.admin()


const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    // Producing
    await producer.connect()
    admin.connect()
    admin.createTopics({
        waitForLeaders: true,
        topics: [
            { topic: 'myRandomTopicString123' },
        ],
    })
    await producer.send({
        topic: 'myRandomTopicString123',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })

    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'myRandomTopicString123', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
}

run().catch(console.error)