require('dotenv').config();
var server = require('http').createServer();
const socket = require('socket.io');
const io = socket(server);

server.listen(process.env.PORT, function() {
  console.log('socket-server listening on port', process.env.PORT);
});

io.on('connection', (socket) => {
	socket.on('message', (data) => {
		io.emit('servermessage', data );
	});
});