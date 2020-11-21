// NodeServer which will handle socketIo connections
const io = require('socket.io')(3000)
var cors = require('cors');

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
    console.log(name, 'connected');
  });
  socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
  });
  socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id])
    delete users[socket.id];
  });
})