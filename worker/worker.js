const { Kafka } = require('kafkajs')
const { exec } = require('child_process')
const { stdout, stderr } = require('process')
const fs = require('fs/promises')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    // Producing
    await producer.connect()
    // await producer.send({
    //     topic: 'users',
    //     messages: [
    //         { value: JSON.stringify({hello: 'hello kafka',
    //                         repository: 'https://github.com/SimonBC3/movies'})},
    //     ],
    // })

    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'in', fromBeginning: false })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            let jsonMessage = JSON.parse(message.value.toString())
            console.log(jsonMessage.url)

            //execute(`git clone ${message.value.url}`)
            //execute(`npm install`)
            execute(`node ${jsonMessage.execPath}${jsonMessage.fileName}`)

            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })

            //readOutFile
            let outMessage = await read(jsonMessage.outPath, jsonMessage.outName)
            await producer.send({
                topic: 'out',
                messages: [
                    {
                        value: JSON.stringify({
                            uuid: `${jsonMessage.uuid}`,
                            outMessage: `${outMessage}`
                        })
                    },
                ],
            })
        },
    })
}

function execute(order) {
    exec((order), (err, stdout, stderr) => {
        if (err) {
            console.error(`error: ${err.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout:\n${stdout}`);
    })
}

async function read(path, fileName) {
    let data = ''
    try {
        let data = await fs.readFile(`${path}${fileName}`, { encoding: 'utf8' })
        console.log(data)
    } catch {
        console.log(err)
    }
    return data;
}

run().catch(console.error)