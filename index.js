const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors')

app.use(cors());

const PORT = 4000;

const server = http.createServer(app);

const ioServer = new Server(server, {
  cors: {
   // origin: "http://localhost:3000",
    origin: '*',  // Tillåt anslutningar från alla domäner (justera för produktion)
  },
});

let myData = {
  id: 1,
  coordinates:[
      51.49, 
      -0.092
    ],
  message : 'mydata'
}


//gives us a socket back
ioServer.on('connection', (socket) => {
  console.log(`Användare ansluten: ${socket.id}`);

  //lysnar på event
  socket.on('disconnect', () => {
    console.log('Användare frånkopplad');
  });

  socket.emit('message', { message: 'Hej från servern!' });

  setInterval(function(){
   
   
    socket.emit('myData' , myData);
  }, 5000);

});

server.listen(PORT, () => {
  console.log(`Servern lyssnar på port ${PORT}`);
});


