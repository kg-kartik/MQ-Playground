const amqp = require("amqplib");


const connect = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        //Assiging different channel for consuming messages from queue by diff client
        const result = await channel.assertQueue("jobs");

        //Consuming the message from the specific queue
        const message = await channel.consume("jobs");

        const resMessage = JSON.parse(message.content.toString());
        console.log(resMessage.data);
    }
    catch(err) {
        console.log(err);
    }
}

connect();