const socketIo = require('socket.io');

module.exports = async ({ server }) => {
  const io = socketIo(server);
  io.on('connection', async socket => {
    console.log('Socket is connected with ', socket.id);
    socket.emit('test');
  });
};
