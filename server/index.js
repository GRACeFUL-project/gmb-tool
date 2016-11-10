var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/clients/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('nodeclicked',function(position){
    console.log(position);
  });
  socket.on('createnode',function(node){
    io.emit('createnode',node);
  });
  socket.on('nodemoved',function(data){
    console.log(data);
    io.emit('nodemoved',data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
