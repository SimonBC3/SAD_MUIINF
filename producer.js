const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
})



var sendMessage = async () => {

  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'myRandomTopicString123',
    messages: [
      { value: 'Hello KafkaJS user ks!' },
    ],
  })
  await producer.disconnect()
}

sendMessage();