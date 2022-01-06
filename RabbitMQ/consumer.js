const amqp = require("amqplib");

const messageToBeAck = process.argv[2];

const connect = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");

        //Creating different channel for consuming messages from queue by diff client
        const channel = await connection.createChannel();

        //Assigning a particular queue for receiving messages
        const result = await channel.assertQueue("jobs");

        //Consuming the message from the specific queue
        channel.consume("jobs",(message) => {
            const resMessage = JSON.parse(message.content.toString());
            console.log(`Received job message with input ${resMessage.data}`);

            //Dequeuing from queue if message has been received and acknowledged by the client            
            if(resMessage.data == messageToBeAck){
                channel.ack(messageToBeAck);
            }

        });

        console.log("Waiting for message.. ");

    }
    catch(err) {
        console.log(err);
    }
}

connect();