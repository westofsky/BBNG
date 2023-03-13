const ChatroomType = {
    LOBBY: 0,
    INGAME: 0,
}

const RequestType = {
    ADD_USER_TO_LIST: 0,
    JOIN_LOBBY: 0,

    // Info Event
    ROOM_LIST: 0,
    ONLINE_LIST : 0,

    // Room Event
    CREATE_ROOM: 0,
    JOIN_ROOM: 0,
    LEAVE_ROOM: 0,
    READY: 0,
    NOT_READY: 0,

    // Queue Event
    JOIN_NORMAL_QUEUE: 0,
    LEAVE_NORMAL_QUEUE: 0,
    ACCEPT_NORMAL_QUEUE: 0,
    REJECT_NORMAL_QUEUE: 0,
    JOIN_RANK_QUEUE: 0,
    LEAVE_RANK_QUEUE: 0,
    ACCEPT_RANK_QUEUE: 0,
    REJECT_RANK_QUEUE: 0,

    // Game Event
    GET_CARD: 0,
    DRAW_CARD: 0,
    BBONG: 0,
    DRAW_BBONG_CARD: 0,
    NATURE: 0,
    STOP: 0,

    // Chatting Event
    SEND_MSG_TO_LOBBY: 0,
    SEND_MSG_TO_ROOM: 0,
}

const ResponseType = {
    RES_ADD_USER_TO_LIST: 0,
    RES_JOIN_LOBBY: 0,

    // Info Event
    RES_ROOM_LIST: 0,
    RES_ONLINE_LIST : 0,

    // Room Event
    RES_CREATE_ROOM : 0,
    RES_JOIN_ROOM: 0,
    RES_PLAYER_READY: 0,
    RES_PLAYER_NOT_READY: 0,
    RES_PLAYER_JOIN: 0,
    RES_PLAYER_LEAVE: 0,

    // Queue Event
    RES_JOIN_NORMAL_QUEUE: 0,
    RES_ACCEPT_NORMAL_QUEUE: 0,
    RES_JOIN_RANK_QUEUE: 0,
    RES_ACCEPT_RANK_QUEUE: 0,

    // Game Event
    RES_GAME_START : 0,
    RES_GAME_END: 0,
    RES_ROUND_START: 0,
    RES_ROUND_END: 0,
    RES_CHANGE_TURN: 0,
    RES_SPREAD_CARD: 0,
    RES_GET_CARD : 0,
    RES_DRAW_CARD : 0,
    RES_BBONG: 0,
    RES_DRAW_BBONG_CARD: 0,
    RES_NATURE: 0,

    // Chatting Event
    BROADCAST_LOBBY_MSG: 0,
    BROADCAST_ROOM_MSG: 0,
}

const ResponseResult = {
    RES_JOIN_ROOM_SUCCESS: 0,
    RES_JOIN_ROOM_FAILED_NOT_EXIST: 0,
    RES_JOIN_ROOM_FAILED_WRONG_PASSWORD: 0,
    RES_JOIN_ROOM_FAILED_ROOM_FULL: 0,
}

function initSocketConstants() {
    var count = 0;
    for(var key in ChatroomType){
        ChatroomType[key] = count;
        count++;
    }
    Object.freeze(ChatroomType);

    for(var key in RequestType) {
        RequestType[key] = count;
        count++;
    }
    Object.freeze(RequestType);

    for(var key in ResponseType) {
        ResponseType[key] = count;
        count++;
    }
    Object.freeze(ResponseType);

    for(var key in ResponseResult) {
        ResponseResult[key] = count;
        count++;
    }
    Object.freeze(ResponseResult);
}

module.exports = {
    ChatroomType
    , RequestType
    , ResponseType
    , ResponseResult
    , initSocketConstants
}