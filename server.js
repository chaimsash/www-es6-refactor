const path = require('path');
const express = require('express');
const app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!
const socketio = require('socket.io');

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
  console.log('The server is listening on port 1337!');
});

server.on('request', app);

const io = socketio(server);

const draws = [];
io.on('connection', function (socket) {
  /* This function receives the newly connected socket.
     This function will be called for EACH browser that connects to our server. */
  console.log(socket.id + ' has connected!');
  socket.emit('drawHistory', draws);

  socket.on('aDraw', function (start, end, strokeColor) {
    draws.push({start, end, strokeColor});
    socket.broadcast.emit('allDraw', start, end, strokeColor);
  });

});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
