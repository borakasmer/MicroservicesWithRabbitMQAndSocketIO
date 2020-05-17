let io = require('../Socket/socket');
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'updateStock';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for stockData messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (data) {
            stock = JSON.parse(data.content.toString())
            console.log(" [x] Received Stock:", stock.name + " : " + stock.value);
            //Socket Trigger All Clients
            io.socket.emit("updatedStock", stock);
        }, {
            noAck: true
        });
    });
});
