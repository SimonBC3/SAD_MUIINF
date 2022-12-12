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