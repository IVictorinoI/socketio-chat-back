const port = process.env.PORT || 3000

const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data)
    })

    socket.on('limpar', data => {
        messages = [];
        socket.broadcast.emit('limpo', {})
        console.log('limpou');
    })
})

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
});