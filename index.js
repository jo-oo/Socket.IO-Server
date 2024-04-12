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

let myData = [
  {
    id: 1,
    departure: "Malmö",
    destination: "Göteborg",
    coordinates:[
      51.506, 
      -0.091
      ],
    delay: "3 minutes",
    message: `hej`
  },
  {
    id: 2,
    departure: "Lund",
    destination: "Halmstad",
    coordinates:[
        51.5063, 
        -0.0912
      ],
    delay: "8 minutes",
    message: 'mydata'
  },
  {
    id: 3,
    departure: "Malmö",
    destination: "Stockholm",
    coordinates:[
        51.508, 
        -0.0912
      ],
    delay: "10 minutes",
    message: 'mydata'
  },
]


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


