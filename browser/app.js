// Never seen window.location before?
// This object describes the URL of the page we're on!
const socket = io(window.location.origin);

socket.on('connect', function () {

  whiteboard.on('draw', function (start, end, strokeColor) {
    socket.emit('aDraw', start, end, strokeColor);
  });

  socket.on('drawHistory', function (draws) {
    draws.forEach(function (drawObj) {
      whiteboard.draw(drawObj.start, drawObj.end, drawObj.strokeColor);
    });
  });

  socket.on('allDraw', function (start, end, strokeColor) {
    whiteboard.draw(start, end, strokeColor);
  });

});
