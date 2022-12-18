let fs = require("fs");


let express = require("express");
let app = express();
const { instrument } = require("@socket.io/admin-ui");
app.use("/", express.static("public"));

const maxPlayers = 2;
let playerCount = 0;
let players = ["-1", "-1"];

app.use("/:roomName", express.static("public/bodybeat"));
app.use("/:roomName/roomFull", (req,res)=>{
  res.send("Room is full.")
});

//Initialize the actual HTTP server
let http = require("http");
let httpServer = http.createServer(app);
// let server = http.createServer(app);

let port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log("Server listening at port: " + port);
});

let io = require("socket.io");
io = new io.Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
}); // use socket.io on the http app

instrument(io, {
  auth: false,
});

let rooms = {};

io.sockets.on("connection", (socket) => {
  socket.on("room_connect", function (room) {
    if(!rooms.hasOwnProperty(room)) {
      rooms[room] = [];
    }
    console.log(rooms[room].length);
    if (rooms[room].length < maxPlayers) {
      rooms[room].push(socket);
      socket.room = room;
      
      let ids = [];
      for (let i = 0; i<rooms[socket.room].length;i++) {
        ids.push(rooms[socket.room][i].id);
      }
      socket.emit("listresults",ids);
    }
    else {
      io.to(socket.id).emit("redirect");
    }
  });
  
  socket.on("list", function() {
    let ids = [];
    for (let i = 0; i < rooms[socket.room].length; i++) {
      ids.push(rooms[socket.room][i].id);
    }
    socket.emit("listresults",ids);
  });
  
  socket.on("signal", (to, from, data) => {
    //console.log("SIGNAL", to, data);
    let found = false;
    for (let i = 0; i < rooms[socket.room].length; i++) {
      //console.log(rooms[socket.room][i].id, to);
      if (rooms[socket.room][i].id == to) {
        //console.log("Found Peer, sending signal");
        rooms[socket.room][i].emit("signal", to, from, data);
        found = true;
        break;
      }
    }
    // if (!found) {
    // 	console.log("never found peer");
    // }
  });
  socket.on("instrumentInfo", (data) => {
    if (rooms[socket.room]) {
      // Check on this
      // Tell everyone first
      instrumentTracker = {};

      for (let i = 0; i < rooms[socket.room].length; i++) {
        if (rooms[socket.room][i].id == socket.id) {
          rooms[socket.room][i].instrumentInfo = data;
        }
        instrumentTracker[rooms[socket.room][i].id] =
          rooms[socket.room][i].instrumentInfo;
      }
    }

    io.sockets.emit("instrumentList", instrumentTracker);
  });
  
  socket.on("backgroundMusicInfo", (data) => {
    if (rooms[socket.room]) {
      // Check on this
      // Tell everyone first
      backgroundMusicTracker = {};

      for (let i = 0; i < rooms[socket.room].length; i++) {
        if (rooms[socket.room][i].id == socket.id) {
          rooms[socket.room][i].backgroundMusicInfo = data;
        }
        backgroundMusicTracker[rooms[socket.room][i].id] =
          rooms[socket.room][i].backgroundMusicInfo;
      }
    }

    io.sockets.emit("backgroundMusicList", backgroundMusicTracker);
  });
  
  socket.on("disconnect", function () {
    // console.log(Date.now(), socket.id, "Client has disconnected");
    if (rooms[socket.room]) {
      // Check on this
      // Tell everyone first
      let which = -1;
      for (let i = 0; i < rooms[socket.room].length; i++) {
        if (rooms[socket.room][i].id != socket.id) {
          rooms[socket.room][i].emit("peer_disconnect", socket.id);
        } else {
          which = i;
        }
      }
      // Now remove from array
      if (rooms[socket.room][which].id == socket.id) {
        rooms[socket.room].splice(which, 1);
      }

      // This could fail if someone joins while the loops are in progress
      // Should be using associative arrays all the way around here
    }
  });
  
});




//old code ----------------------------

// io.on("connect", (socket) => {
//   // console.log("New Connection : ", socket.id);

//   console.log("New Connection: ", socket.id);
//   playerCount++;
//   console.log("Player Count: ", playerCount);

//   if (playerCount == 1) {
//     players[0] = socket.id;
//   } else if (playerCount == 2) {
//     if (players[0] == "-1") {
//       players[0] = socket.id;
//     } else {
//       players[1] = socket.id;
//     }
//   } else {
//     players.push(socket.id);
//   }
//   console.log(players);

//   io.emit("serverPlayers", players);
  
//   socket.on("disconnect", () => {
//     for (let i = 0; i < players.length; i++) {
//       if (socket.id == players[i]) {
//         players[i] = "-1";
//       }
//     }
//     console.log("Socket Disconnected: ", socket.id);
//     playerCount--;
//     console.log("Player Count: ", playerCount);
//     console.log(players);
//   });
// });
//--------------------------------------------------


//temp code external XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//     activities.forEach((e) => {
//         socket.emit("activity", e)
//     })

//     socket.on('joinroom', (data) => {
//         console.log(io.sockets.adapter.sids);
//         if(socket.room) {
//             socket.leave(socket.room);
//         }
//         socket.join(data.room);
//         socket.room = data.room;
//         if (!messages[socket.room]) {
//             messages[socket.room] = [];
//         }
//         socket.emit('messages',messages[socket.room]);
