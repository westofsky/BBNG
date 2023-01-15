var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var friendsRouter = require('./routes/friends');

var app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;
require("dotenv").config();
//db 세팅
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(
  process.env.DB_URL,
  {
    // useNewUrlPaser: true,
    // useUnifiedTofology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  }
).then(() => {
  console.log('MongoDB 연결됨');

}).catch((err) => {
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(express.static(__dirname));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
// api용 
app.use('/api/users/', usersRouter);
app.use('/api/friends/', friendsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;

////// Create socket server with http server.
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
const sock_const = require(path.join(__dirname, '..', 'common', 'constant', 'socket-constants.js'));
const game_const = require(path.join(__dirname, '..', 'common', 'constant', 'game-constants.js'));
let clientListBySocket = new Map();
let clientListByNickname = new Map();
let gameRoomList = {};

// Initializing constants.
sock_const.initSocketConstants();
game_const.initGameConstants();

// Set event in io.
io.on('connection', (socket) => { // New client socket connected.
  console.log('Client connected: ' + socket.id);

  socket.on(sock_const.RequestType.ADD_USER_TO_LIST, function (data) {
    clientListBySocket.set(socket.id, data);
    clientListByNickname.set(data, socket.id);

    console.log('Client List: ');
    let mapString = '';
    clientListBySocket.forEach((value, key) => {
      mapString += `socket id: ${key}, nickname: ${value}\n`;
    });
    clientListByNickname.forEach((value, key) => {
      mapString += `nickname: ${key}, socket id: ${value}\n`;
    });
    console.log(mapString);
  });

  socket.on(sock_const.RequestType.JOIN_LOBBY, function (data) {
    console.log("join:" + socket.id);
    socket.join(sock_const.ChatroomType.LOBBY);
  });

  // Leave lobby chatting.
  socket.on(sock_const.RequestType.LEAVE_LOBBY, function (data) {
    socket.leave(sock_const.ChatroomType.LOBBY);
  });

  // Receive message from client.
  socket.on(sock_const.RequestType.SEND_MSG_TO_LOBBY, function (data) {
    console.log("send message:" + data);
    socket.broadcast.to(sock_const.ChatroomType.LOBBY).emit(sock_const.ResponseType.BROADCAST_LOBBY_MSG, data);
  });

  // Create custom room.
  socket.on(sock_const.RequestType.CREATE_ROOM, (gameRoom) => {
    gameRoom.rid = createRoomId((gameRoom.host + (new Date()).toLocaleString()));
    gameRoomList[gameRoom.rid] = gameRoom;
    socket.join(gameRoom.rid);
    console.log('Game room created: ' + JSON.stringify(gameRoomList));
  });

  // Send room list to client.
  socket.on(sock_const.RequestType.ROOM_LIST, () => {
    let gameRoomListSendData = {};
    let excludeProps = ['password', 'players'];
    for (let key in gameRoomList) {
      gameRoomListSendData[key] = Object.assign({}, gameRoomList[key]);
      excludeProps.forEach(prop => delete gameRoomListSendData[key][prop]);
      gameRoomListSendData[key]['password_required'] = (gameRoomList[key].password != '');
    }
    socket.emit(sock_const.ResponseType.RES_ROOM_LIST, gameRoomListSendData);
  });

  // Client disconnected.
  socket.on('disconnect', (reason) => {
    console.log('Client disconnected: ' + socket.id + ' [' + reason + ']');

    clientListByNickname.delete(clientListBySocket.get(socket.id));
    clientListBySocket.delete(socket.id);

    console.log('Client List: ');
    let mapString = '';
    clientListBySocket.forEach((value, key) => {
      mapString += `socket id: ${key}, nickname: ${value}\n`;
    });
    clientListByNickname.forEach((value, key) => {
      mapString += `nickname: ${key}, socket id: ${value}\n`;
    });
    console.log(mapString);
  });
});

// Listening from port.
httpServer.listen(port, () => {
  console.log(`${port}포트에서 서버 작동중입니다.`);
});

const crypto = require('crypto');

function createRoomId(roomName, roomType) {
  return createHashFromString(roomName + roomType + (new Date()).toLocaleString());
}

function createHashFromString(string) {
  const hash = crypto.createHash('sha256');
  hash.update(string);
  return hash.digest('hex').slice(0, 32);
}