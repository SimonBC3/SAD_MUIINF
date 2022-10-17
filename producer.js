const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
})


const producer = kafka.producer()

 producer.connect()
 producer.send({
  topic: 'test-topic',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

  producer.disconnect()