const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092','0.0.0.0:29092']
})

const admin = kafka.admin()
admin.connect()
admin.createTopics({
    waitForLeaders: true,
    topics: [
        { topic: 'myRandomTopicString123' },
    ],
})


module.exports = kafka