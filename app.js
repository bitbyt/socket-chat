var express = require('express'),
    app     = new express(),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io.client'));

app.set('port', (process.env.PORT || 8080));

server.listen(app.get('port'), function() {
  console.log('Server running at localhost', app.get('port'))
});

//socket on funciton
io.on('connection', function(socket){

  //listens when client emits 'chat message'
  socket.on('chat message', function(data){
    //execute 'chat message'
    socket.broadcast.emit('chat message', {
      username: socket.username,
      message: data
    });
  });

  //when new user logs in
  socket.on('new user', function(username){

    //store username in socket session
    socket.username = username;
  })

  //when a user logs out
});
