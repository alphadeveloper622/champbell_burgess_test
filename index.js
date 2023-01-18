const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3123;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  var timestamp=new Date().toISOString();
  console.log('ok:'+timestamp);
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    var timestamp=new Date().toISOString();
    var rec=socket.id+':'+timestamp+":"+msg;
    console.log(rec);
  });
  socket.on('disconnect', () => {
    var timestamp=new Date().toISOString();
    console.log(socket.id,':',timestamp,":disconnet");
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
