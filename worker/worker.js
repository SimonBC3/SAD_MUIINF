const { Kafka } = require('kafkajs')
const { exec } = require('child_process')
const { stdout, stderr } = require('process')
const fs = require('fs/promises')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'worker-group' })

const run = async () => {
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'in', fromBeginning: false })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
            
            let jsonMessage = JSON.parse(message.value.toString())

            execute(`git clone ${jsonMessage.url} clone`)
            //execute(`npm install`)
            execute(`node ./clone${jsonMessage.execPath}${jsonMessage.execName} ${jsonMessage.args}`)

            //readOutFile
            let path = `./clone${jsonMessage.outPath}`
            let outMessage = await read(`${jsonMessage.outPath}`, jsonMessage.outName)
            await producer.connect()
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
        data = await fs.readFile(`${path}${fileName}`, { encoding: 'utf8' })
        console.log(data)
    } catch {
        console.log(err)
    }
    return data;
}

run().catch(console.error)