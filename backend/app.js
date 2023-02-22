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
let clientListBySocket = {};  // Map that holds the information of all connected clients using socketID as the key
let clientListByNickname = {}; // Map that holds the information of all conncected clients using user nickname as the key.
let playingClientList = {}; // Map for storing list of clients currently playing the game, using user nickname as the key.
let gameRoomList = {}; // Map to hold the list of created rooms, with room id as the key.

// Initializing constants.
sock_const.initSocketConstants();
game_const.initGameConstants();

// Set event in io.
io.on('connection', (socket) => { // IO Listener Event - 새로운 Client 연결
  console.log("IO Event(connection): '" + socket.id + "' connected");

  // Socket Listener Event - Client가 연결되었을 때, 접속 중인 Client 리스트에 해당 Client 추가
  socket.on(sock_const.RequestType.ADD_USER_TO_LIST, function (data) {
    clientListBySocket[socket.id] = {
      nickname: data,
      rid: '',
    };
    clientListByNickname[data] = {
      socket_id: socket.id,
      rid: '',
    };

    socket.emit(sock_const.ResponseType.RES_ADD_USER_TO_LIST);
    console.log('Socket Event(ADD_USER_TO_LIST): Connected client list\n########################\n' + JSON.stringify(clientListBySocket) + '\n########################');
  });

  // Socket Listener Event - 온라인 상태 친구목록 요청
  socket.on(sock_const.RequestType.GET_ONLINE_LIST, () => {
    let onlineList = [];
    for (var i = 0; i < Object.values(clientListBySocket).length; i++) {
      onlineList.push(Object.values(clientListBySocket)[i].nickname);
    }
    socket.emit(sock_const.ResponseType.RES_ONLINE_LIST, onlineList);
    console.log("Socket Event(GET_ONLINE_LIST): Player '" + clientListBySocket[socket.id].nickname + "' request online friend list");
  });

  // Socket Listener Event - Lobby에 참여
  socket.on(sock_const.RequestType.JOIN_LOBBY, function (data) {
    socket.join(sock_const.ChatroomType.LOBBY);
    socket.emit(sock_const.ResponseType.RES_JOIN_LOBBY);
    console.log("Socket Event(JOIN_LOBBY): Player '" + clientListBySocket[socket.id].nickname + "' joins the lobby");
  });

  // Socket Listener Event - Lobby에서 떠남
  socket.on(sock_const.RequestType.LEAVE_LOBBY, function (data) {
    socket.leave(sock_const.ChatroomType.LOBBY);

    console.log("Socket Event(LEAVE_LOBBY): Player '" + clientListBySocket[socket.id].nickname + "' leaves the lobby");
  });

  // Socket Listener Event - Lobby로 전체 메세지 전달
  socket.on(sock_const.RequestType.SEND_MSG_TO_LOBBY, function (data) {
    socket.broadcast.to(sock_const.ChatroomType.LOBBY).emit(sock_const.ResponseType.BROADCAST_LOBBY_MSG, data);

    console.log("Socket Event(SEND_MSG_TO_LOBBY): Player '" + clientListBySocket[socket.id].nickname + "' send message '" + data.message + "' to lobby");
  });

  // Socket Listener Event - Room으로 채팅 메세지 전달
  socket.on(sock_const.RequestType.SEND_MSG_TO_ROOM, function (data) {
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.BROADCAST_ROOM_MSG, data);

    console.log("Socket Event(SEND_MSG_TO_ROOM): Player '" + clientListBySocket[socket.id].nickname + "' send message '" + data.message + "' to room '" + data.rid + "'");
  });

  // Socket Listener Event - 사용자 설정 방 생성
  socket.on(sock_const.RequestType.CREATE_ROOM, (gameRoom) => {
    gameRoom.rid = createRoomId((gameRoom.host + (new Date()).toLocaleString()));
    gameRoom['game_data'] = {
      ready_count: 0,
      current_round: 0,
      current_player: 0,
      player: [],
      deck: [],
      push_deck: [],
      round_result: [],
      message_key: '',
    }
    gameRoomList[gameRoom.rid] = gameRoom;
    socket.leave(sock_const.ChatroomType.LOBBY);
    socket.join(gameRoom.rid);
    clientListBySocket[socket.id].rid = gameRoom.rid;
    clientListByNickname[clientListBySocket[socket.id].nickname].rid = gameRoom.rid;
    socket.emit(sock_const.ResponseType.RES_GET_ROOM_RID, {
      room_data: filterRoomData(gameRoom.rid),
    });
    console.log("Socket Event(CREATE_ROOM): Created room list\n########################\n" + JSON.stringify(gameRoomList) + '\n########################');
  });

  // Socket Listener Event - 사용자 설정 방 참여
  socket.on(sock_const.RequestType.JOIN_ROOM, (data) => {
    if (gameRoomList.hasOwnProperty(data.rid)) { // rid 값의 방이 존재할 경우
      if (gameRoomList[data.rid].current_player_count < gameRoomList[data.rid].player_limit) { // 방에 빈 자리가 있을 경우
        if (data.password == gameRoomList[data.rid].password) { // 참여하려는 방의 비밀번호가 일치할 경우
          socket.leave(sock_const.ChatroomType.LOBBY);
          socket.join(data.rid);
          gameRoomList[data.rid].players.push({
            socket_id: data.socket_id,
            oid: data.oid,
            nickname: data.nickname
          });
          gameRoomList[data.rid].current_player_count += 1;
          clientListBySocket[socket.id].rid = data.rid;
          clientListByNickname[clientListBySocket[socket.id].nickname].rid = data.rid;

          socket.emit(sock_const.ResponseType.RES_JOIN_ROOM, {
            result: sock_const.ResponseResult.RES_JOIN_ROOM_SUCCESS,
            room_data: filterRoomData(data.rid),
          });
          console.log("Socket Event(JOIN_ROOM): Player '" + data.nickname + "' joins room '" + data.rid + "'");
          socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_PLAYER_JOIN, {
            nickname: data.nickname,
            room_data: filterRoomData(data.rid),
          });
        } else { // 참여하려는 방의 비밀번호가 일치하지 않을 경우
          socket.emit(sock_const.ResponseType.RES_JOIN_ROOM, {
            result: sock_const.ResponseResult.RES_JOIN_ROOM_FAILED_WRONG_PASSWORD
          });
          console.log("Socket Event(JOIN_ROOM): Player '" + data.nickname + "' failed to join room '" + data.rid + "' => Incorrect password");
        }
      } else { // 방에 빈 자리가 없을 경우
        socket.emit(sock_const.ResponseType.RES_JOIN_ROOM, {
          result: sock_const.ResponseResult.RES_JOIN_ROOM_FAILED_ROOM_FULL
        });
        console.log("Socket Event(JOIN_ROOM): Player '" + data.nickname + "' failed to join room '" + data.rid + "' => Room already full");
      }
    } else {
      // rid 값의 방이 존재하지 않을 경우
      socket.emit(sock_const.ResponseType.RES_JOIN_ROOM, {
        result: sock_const.ResponseResult.RES_JOIN_ROOM_FAILED_NOT_EXIST
      });
      console.log("Socket Event(JOIN_ROOM): Player '" + data.nickname + "' failed to join room '" + data.rid + "' => Room does not exist");
    }
  });

  // Socket Listener Event - 사용자 설정 방 떠나기
  socket.on(sock_const.RequestType.LEAVE_ROOM, (data) => {
    gameRoomList[data.rid].players = gameRoomList[data.rid].players.filter(function (player) {
      return player.nickname !== nickname
    });
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_PLAYER_LEAVE, {
      nickname: data.nickname,
      room_data: filterRoomData(data.rid),
    });
  });

  // Socket Listener Event - 사용자 설정 방 목록 요청
  socket.on(sock_const.RequestType.ROOM_LIST, () => {
    let gameRoomListSendData = {};
    let excludeProps = ['password', 'players'];
    for (let key in gameRoomList) {
      gameRoomListSendData[key] = Object.assign({}, gameRoomList[key]);
      excludeProps.forEach(prop => delete gameRoomListSendData[key][prop]);
      gameRoomListSendData[key]['password_required'] = (gameRoomList[key].password != '');
    }
    socket.emit(sock_const.ResponseType.RES_ROOM_LIST, gameRoomListSendData);
    console.log("Socket Event(ROOM_LIST): Player '" + clientListBySocket[socket.id].nickname + "' request created room list");
  });

  // Socket Listener Event - Client 연결 끊김
  socket.on('disconnect', (reason) => {
    console.log("Socket Event(disconnect): '" + socket.id + "' disconnected => " + reason);

    var socketId = socket.id;
    var nickname = clientListBySocket[socketId].nickname;
    var joinedGameRoom = clientListBySocket[socket.id].rid;

    if (joinedGameRoom != '') { // 방에 참여한 상태인 경우
      socket.leave(joinedGameRoom);
      gameRoomList[joinedGameRoom].current_player_count -= 1;
      if (gameRoomList[joinedGameRoom].current_player_count == 0) { // 방에 다른 플레이어가 없을 경우
        console.log("Room Event: Room '" + JSON.stringify(gameRoomList[joinedGameRoom]) + "' removed due to lack of active players");
        delete gameRoomList[joinedGameRoom];
      } else { // 방에 다른 플레이어가 남아있을 경우
        console.log("Room Event: Player '" + nickname + "' has been removed from room '" + JSON.stringify(gameRoomList[joinedGameRoom]) + "'");
        // 게임이 진행 중일 경우와 진행 중이지 않을 경우에 따라 플레이어 목록에서 플레이어를 제거할지 제거하지 않을 지에 대한 로직 추가 필요
        //

        gameRoomList[joinedGameRoom].players = gameRoomList[joinedGameRoom].players.filter(function (player) {
          return player.nickname !== nickname
        });
        io.to(joinedGameRoom).emit(sock_const.ResponseType.RES_PLAYER_LEAVE, {
          nickname: nickname,
          room_data: filterRoomData(joinedGameRoom),
        });
      }
    }
    delete clientListByNickname[nickname];
    delete clientListBySocket[socketId];
  });

  // 게임방 관련 socket 처리
  // 게임방 READY 및 시작
  socket.on(sock_const.RequestType.READY, (data) => {
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_PLAYER_READY, {
      nickname: data.nickname
    });
    gameRoomList[data.rid].game_data.ready_count += 1;
    if (gameRoomList[data.rid].player_limit == gameRoomList[data.rid].game_data.ready_count) {
      io.to(data.rid).emit(sock_const.ResponseType.RES_GAME_START);
      setTimeout(function () {
        console.log('delay');
      }, 3000);
      for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
        gameRoomList[data.rid].game_data.player.push(
          {
            nickname: [gameRoomList[data.rid].players[i].nickname],
            turn_count: 0,
            cards: [],
            state: 0,
            over_price: 0,
          }
        )
      }
      io.to(data.rid).to(data.rid).emit(sock_const.ResponseType.RES_ROUND_START, {
        player_turn:
          gameRoomList[data.rid].players[Math.floor(Math.random() * (gameRoomList[data.rid].player_limit - 1))].nickname,
        round: gameRoomList[data.rid].game_data.current_round
      });
      setTimeout(function () {
        console.log('delay');
      }, 3000);
      var j = 0;
      gameRoomList[data.rid].game_data.deck = shuffleDeck(createDeck());
      for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
        gameRoomList[data.rid].game_data.player[i].cards = gameRoomList[data.rid].game_data.deck.slice(j, j + 5);
        io.to(gameRoomList[data.rid].players[i].socket_id).emit(sock_const.ResponseType.RES_SPREAD_CARD, {
          cards: gameRoomList[data.rid].game_data.deck.slice(j, j + 5)
        })
        j += 5;
      }
      io.to(data.rid).to(data.rid).emit(sock_const.ResponseType.RES_GET_CARDS, {
        players: gameRoomList[data.rid].game_data.player
      });
      gameRoomList[data.rid].game_data.deck = gameRoomList[data.rid].game_data.deck.splice(0, 5 * gameRoomList[data.rid].player_limit);
    }

    console.log("Room Event: Player '" + data.nickname + "' ready");
  })

  // 게임방 NOT READY
  socket.on(sock_const.RequestType.NOT_READY, (data) => {
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_PLAYER_NOT_READY, {
      nickname: data.nickname
    })
    gameRoomList[data.rid].game_data.ready_count -= 1;
    console.log("Room Event: Player '" + data.nickname + "' not ready");
  })

  // 게임방 카드 한장 뽑기
  socket.on(sock_const.RequestType.GET_CARD, (data) => {
    for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
      if (gameRoomList[data.rid].game_data.player[i].nickname == data.nickname) {
        var j = i;
      }
    }
    socket.emit(sock_const.ResponseType.RES_GET_CARD, {
      card: gameRoomList[data.rid].game_data.deck.slice(0, 1)
    })
    gameRoomList[data.rid].game_data.player[j].cards.push(gameRoomList[data.rid].game_data.deck.slice(0, 1));
    gameRoomList[data.rid].game_data.deck = gameRoomList[data.rid].game_data.deck.splice(0, 1)
    io.to(data.rid).to(data.rid).emit(sock_const.ResponseType.RES_GET_CARDS, {
      players: gameRoomList[data.rid].game_data.player
    });
    if (gameRoomList[data.rid].game_data.deck.length == 0) {
      gameRoomList[data.rid].game_data.deck = shuffleDeck(gameRoomList[data.rid].game_data.push_deck)
    }
  })

  // 게임방 카드 한장 버리기
  socket.on(sock_const.RequestType.DRAW_CARD, (data) => {
    for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
      if (gameRoomList[data.rid].game_data.player[i].nickname == data.nickname) {
        var j = i;
        break;
      }
    }
    gameRoomList[data.rid].game_data.player[j].cards = gameRoomList[data.rid].game_data.player[j].cards.filter(item => item !== data.card.draw_card);
    gameRoomList[data.rid].game_data.push_deck.push(data.card.draw_card);
    if (data.over_price == 0 && gameRoomList[data.rid].game_data.player[j].state == 1) {
      if (Number(gameRoomList[data.rid].game_data.player[j].cards[0].slice(1)) == Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1))) { // 바가지로 변경
        gameRoomList[data.rid].game_data.player[j].state = 2;
        gameRoomList[data.rid].game_data.player[j].over_price = Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1));
      }
    }
    else if (data.over_price != 0) {
      if (Number(gameRoomList[data.rid].game_data.player[j].cards[0].slice(1)) != Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1))) { // 바가지 해제
        gameRoomList[data.rid].game_data.player[j].state = 1;
        gameRoomList[data.rid].game_data.player[j].over_price = 0;
      }
    }
    gameRoomList[data.rid].game_data.player[j].turn_count++;
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_DRAW_CARD, {
      nickname: data.nickname,
      over_price: gameRoomList[data.rid].game_data.player[j].over_price,
      card: data.card
    })
    io.to(data.rid).to(data.rid).emit(sock_const.ResponseType.RES_GET_CARDS, {
      players: gameRoomList[data.rid].game_data.player
    });
  })

  // 게임방 뽕 처리
  socket.on(sock_const.RequestType.BBONG, (data) => {
    for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
      if (gameRoomList[data.rid].game_data.player[i].nickname == data.nickname) {
        var j = i;
        break;
      }
    }
    gameRoomList[data.rid].game_data.player[j].cards = gameRoomList[data.rid].game_data.player[j].cards.filter(item => item !== data.bbong_cards[0] && item !== data.bbong_cards[1] && item !== data.draw_card);
    gameRoomList[data.rid].game_data.push_deck.push(data.bbong_cards[0], data.bbong_cards[1], data.draw_card);
    if (Number(gameRoomList[data.rid].game_data.player[j].cards[0].slice(1)) == Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1))) { // 바가지 일 때
      gameRoomList[data.rid].game_data.player[j].state = 2;
      gameRoomList[data.rid].game_data.player[j].over_price = Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1));
    }
    else {
      gameRoomList[data.rid].game_data.player[j].state = 1;
    }
    gameRoomList[data.rid].game_data.player[j].turn_count++;
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_BBONG, {
      nickname: data.nickname,
      cards: data.bbong_cards,
      draw_card: data.draw_card,
      over_price: gameRoomList[data.rid].game_data.player[j].over_price
    })
    io.to(data.rid).to(data.rid).emit(sock_const.ResponseType.RES_GET_CARDS, {
      players: gameRoomList[data.rid].game_data.player
    });
  });

  // 자연 처리 로직
  socket.on(sock_const.RequestType.NATURE_BBONG, (data) => {
    for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
      if (gameRoomList[data.rid].game_data.player[i].nickname == data.nickname) {
        var j = i;
        break;
      }
    }
    gameRoomList[data.rid].game_data.player[j].cards = gameRoomList[data.rid].game_data.player[j].cards.filter(item => item !== data.nature_cards[0] && item !== data.nature_cards[1] && item !== data.nature_cards[2] && item !== data.draw_card);
    gameRoomList[data.rid].game_data.push_deck.push(data.nature_cards[0], data.nature_cards[1], data.nature_cards[2], data.draw_card);
    if (Number(gameRoomList[data.rid].game_data.player[j].cards[0].slice(1)) == Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1))) { // 바가지 일 때
      gameRoomList[data.rid].game_data.player[j].state = 2;
      gameRoomList[data.rid].game_data.player[j].over_price = Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1));
    }
    else {
      gameRoomList[data.rid].game_data.player[j].state = 1;
    }
    gameRoomList[data.rid].game_data.player[j].turn_count++;
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_NATURE_BBONG, {
      nickname: data.nickname,
      cards: data.nature_cards,
      draw_card: data.draw_card,
      over_price: gameRoomList[data.rid].game_data.player[j].over_price
    })
    io.to(data.rid).to(data.rid).emit(sock_const.ResponseType.RES_GET_CARDS, {
      players: gameRoomList[data.rid].game_data.player
    });
  });

  // 스탑(뽕 상태 스탑, 메이드) 처리 로직
  socket.on(sock_const.RequestType.STOP, (data) => {
    for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
      if (gameRoomList[data.rid].game_data.player[i].nickname == data.nickname) {
        var j = i;
        break;
      }
    }
    var card_sum = 0;
    if (data.type == 0) { // low, 4 2
      for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
        if (j == i) {
          gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
            player_score[gameRoomList[data.rid].game_data.player[j].nickname] = -100;
        }
        else {
          for (var k = 0; k < gameRoomList[data.rid].game_data.player[i].cards.length; k++) {
            card_sum += Number(gameRoomList[data.rid].game_data.player[i].cards[k].slice(1));
          }
          gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
            player_score[gameRoomList[data.rid].game_data.player[i].nickname] = card_sum;
        }
      }
    }
    else if (data.type == 1) {  // 3 3, high
      for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
        if (j == i) {
          gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
            player_score[gameRoomList[data.rid].game_data.player[j].nickname] = -60;
        }
        else {
          for (var k = 0; k < gameRoomList[data.rid].game_data.player[i].cards.length; k++) {
            card_sum += Number(gameRoomList[data.rid].game_data.player[i].cards[k].slice(1));
          }
          gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
            player_score[gameRoomList[data.rid].game_data.player[i].nickname] = card_sum;
        }
      }
    }
    else if (data.type == 2) {  // 스트레이트
      for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
        for (var k = 0; k < gameRoomList[data.rid].game_data.player[i].cards.length; k++) {
          card_sum += Number(gameRoomList[data.rid].game_data.player[i].cards[k].slice(1));
        }
        if (j == i) {
          gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
            player_score[gameRoomList[data.rid].game_data.player[j].nickname] = -(card_sum);
        }
        else {
          gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
            player_score[gameRoomList[data.rid].game_data.player[i].nickname] = card_sum;
        }
      }
    }
    else if (data.type == 3) {  // 2 2 2
      for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
        if (j == i) {
          gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
            player_score[gameRoomList[data.rid].game_data.player[j].nickname] = 0;
        }
        else {
          for (var k = 0; k < gameRoomList[data.rid].game_data.player[i].cards.length; k++) {
            card_sum += Number(gameRoomList[data.rid].game_data.player[i].cards[k].slice(1));
          }
          gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
            player_score[gameRoomList[data.rid].game_data.player[i].nickname] = card_sum;
        }
      }
    }
    else if (data.type == 4) {  // 뽕 스탑
      var flag = 0;
      var mycard_sum = Number(gameRoomList[data.rid].game_data.player[j].cards[0].slice(1)) + Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1))
      for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
        if (gameRoomList[data.rid].game_data.player[i].state != 0 && j != i) {
          if (mycard_sum >= Number(gameRoomList[data.rid].game_data.player[j].cards[0].slice(1)) + Number(gameRoomList[data.rid].game_data.player[j].cards[1].slice(1)))
            flag++
          break;
        }
      }
      if (flag == 0) {  // 자기보다 낮은숫자의 카드가 없을 때
        for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
          if (j == i) {
            gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
              player_score[gameRoomList[data.rid].game_data.player[j].nickname] = 0;
          }
          else {
            for (var k = 0; k < gameRoomList[data.rid].game_data.player[i].cards.length; k++) {
              card_sum += Number(gameRoomList[data.rid].game_data.player[i].cards[k].slice(1));
            }
            gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
              player_score[gameRoomList[data.rid].game_data.player[i].nickname] = card_sum;
          }
        }
      }
      else { // 자기보다 낮은숫자의 카드가 있을 때
        for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
          for (var k = 0; k < gameRoomList[data.rid].game_data.player[i].cards.length; k++) {
            card_sum += Number(gameRoomList[data.rid].game_data.player[i].cards[k].slice(1));
          }
          if (j == i) {
            gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
              player_score[gameRoomList[data.rid].game_data.player[j].nickname] = card_sum + 30;
          }
          else {
            gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
              player_score[gameRoomList[data.rid].game_data.player[i].nickname] = card_sum;
          }
        }
      }
    }
    gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].round = gameRoomList[data.rid].game_data.current_round;
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_STOP, {
      round: gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].round,
      player_score: gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].player_score
    })
    gameRoomList[data.rid].game_data.current_round++;
  });

  // 바가지 처리 로직
  socket.on(sock_const.RequestType.OVER_PRICE, (data) => {
    for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
      if (gameRoomList[data.rid].game_data.player[i].nickname == data.my_nickname) {
        var j = i;
      }
      else if (gameRoomList[data.rid].game_data.player[i].nickname == data.nickname) {
        var k = i;
      }
    }
    var sum = 0;
    for (var i = 0; i < gameRoomList[data.rid].player_limit; i++) {
      for (var l = 0; l < gameRoomList[data.rid].game_data.player[i].cards.length; l++) {
        sum += Number(gameRoomList[data.rid].game_data.player[k].cards[l].slice(1));
      }
      if (i == j) { // 바가지 먹은 사람
        gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
          player_score[gameRoomList[data.rid].game_data.player[j].nickname] = sum + 30;
      }
      else if (i == k) {  // 바가지 먹인 사람
        gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
          player_score[gameRoomList[data.rid].game_data.player[k].nickname] = 0;
      }
      else { // 그 외
        gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].
          player_score[gameRoomList[data.rid].game_data.player[i].nickname] = sum;
      }
    }
    gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].round = gameRoomList[data.rid].game_data.current_round;
    socket.broadcast.to(data.rid).emit(sock_const.ResponseType.RES_OVER_PRICE, {
      round: gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].round,
      player_score: gameRoomList[data.rid].game_data.round_result[gameRoomList[data.rid].game_data.current_round].player_score
    })
    gameRoomList[data.rid].game_data.current_round++;
  });
});

// 서버 실행
httpServer.listen(port, () => {
  console.log(`${port}포트에서 서버 작동중입니다.`);
});

const crypto = require('crypto');
const { FORMERR } = require('dns');
const { join } = require('path');

// Function - 전달받은 RoomName, RoomType과 현재 시간을 기준으로 고유의 RoomId를 만들어줌
function createRoomId(roomName, roomType) {
  return createHashFromString(roomName + roomType + (new Date()).toLocaleString());
}

// Function - 문자열을 32 길이의 Hash 문자열로 변환
function createHashFromString(string) {
  const hash = crypto.createHash('sha256');
  hash.update(string);
  return hash.digest('hex').slice(0, 32);
}

// Function - 새로운 카드 덱 생성
function createDeck() {
  return [
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12',
    'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12',
  ];
}

// Function - 전달받은 덱의 카드를 무작위로 섞음
function shuffleDeck(deck) {
  for (let loop1 = deck.length - 1; loop1 > 0; loop1--) {
    let loop2 = Math.floor(Math.random() * (loop1 + 1));
    [deck[loop1], deck[loop2]] = [deck[loop2], deck[loop1]];
  }
  return deck;
}

function filterRoomData(rid) {
  const { password, game_data, ...filteredData } = gameRoomList[rid];
  filteredData.players = gameRoomList[rid].players.map(player => player.nickname);
  return filteredData;
}