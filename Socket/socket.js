const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports = {

    socket : any = io.on('connection', (socket) => {
        console.log('User Socket Connected');
        socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));
    })
};

server.listen(1923);