var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = require('./routers/users');

app.use('/rest/v1/users', users);

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(4000, function(){
    console.log('listening on *:4000');
});

