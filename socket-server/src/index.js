require('dotenv').config();
const server = require('http').createServer();
const socket = require('socket.io');
const io = socket(server);

server.listen(process.env.PORT, function() {
  console.log('socket-server listening on port', process.env.PORT);
});

io.on('connection', (socket) => {

  socket.on('subscribe', function(room) {
    console.log('joining room', room);
    socket.join(room);
  })

  socket.on('unsubscribe', function(room) {
    console.log('leaving room', room);
    socket.leave(room);
  })

  socket.on('send', function(data) {
    console.log('sending message');
    io.sockets.in(data.room).emit('message', data);
  })
});