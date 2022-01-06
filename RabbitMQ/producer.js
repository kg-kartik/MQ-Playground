const amqp = require("amqplib");

const msg = {data:process.argv[2]};

const connect = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        
        //Creating channels through which message will be published from client->queue
        const channel = await connection.createChannel();
        
        //Assigning a quue
        const result = await channel.assertQueue("jobs");
        console.log(result,"result");

        //Sending data to queue
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)));

        console.log(`Job message sent successfully ${msg.data}`);
    }
    catch(err) {
        console.log(err);
    }
}

connect();