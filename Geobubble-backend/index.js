const path = require('path')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function(socket){
  // console.log('a user is connected ' + socket.id);

  socket.on('location-change', data => {
    // console.log("DATA RECIEVED FROM: " , data.id)
    // socket.emit('location-change', data )
    socket.broadcast.emit('location-change', data)
  })
});

const PORT = process.env.PORT || 3000
http.listen(PORT, function(){
  console.log('server running on: http://localhost:' + PORT);
});
