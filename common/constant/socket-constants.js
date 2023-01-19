const ChatroomType = {
    LOBBY: 0,
    INGAME: 0,
}

const RequestType = {
    ADD_USER_TO_LIST: 0,
    JOIN_LOBBY: 0,
    LEAVE_LOBBY: 0,
    ADD_FRIEND: 0,
    DELETE_FRIEND: 0,
    INVITE_FRIEND: 0,
    ACCEPT_INVITE: 0,
    ROOM_LIST: 0,
    CREATE_ROOM: 0,
    DESTROY_ROOM: 0,
    JOIN_ROOM: 0,
    LEAVE_ROOM: 0,
    READY_ROOM: 0,
    NOT_READY_ROOM: 0,
    JOIN_NORMAL_QUEUE: 0,
    LEAVE_NORMAL_QUEUE: 0,
    ACCEPT_NORMAL_QUEUE: 0,
    REJECT_NORMAL_QUEUE: 0,
    JOIN_RANK_QUEUE: 0,
    LEAVE_RANK_QUEUE: 0,
    ACCEPT_RANK_QUEUE: 0,
    REJECT_RANK_QUEUE: 0,
    SEND_MSG_TO_LOBBY: 0,
    SEND_MSG_TO_ROOM: 0,
    SEND_MSG_TO_INGAME: 0,
    GET_ONLINE_LIST : 0,
}

const ResponseType = {
    RES_JOIN_LOBBY: 0,
    RES_LEAVE_LOBBY: 0,
    RES_ADD_FRIEND: 0,
    RES_DELETE_FRIEND: 0,
    RES_INVITE_FRIEND: 0,
    RES_ACCEPT_INVITE: 0,
    RES_ROOM_LIST: 0,
    RES_CREATE_ROOM: 0,
    RES_DESTROY_ROOM: 0,
    RES_JOIN_ROOM: 0,
    RES_LEAVE_ROOM: 0,
    RES_READY_ROOM: 0,
    RES_NOT_READY_ROOM: 0,
    RES_JOIN_NORMAL_QUEUE: 0,
    RES_LEAVE_NORMAL_QUEUE: 0,
    RES_ACCEPT_NORMAL_QUEUE: 0,
    RES_REJECT_NORMAL_QUEUE: 0,
    RES_JOIN_RANK_QUEUE: 0,
    RES_LEAVE_RANK_QUEUE: 0,
    RES_ACCEPT_RANK_QUEUE: 0,
    RES_REJECT_RANK_QUEUE: 0,
    BROADCAST_LOBBY_MSG: 0,
    BROADCAST_ROOM_MSG: 0,
    BROADCAST_INGAME_MSG: 0,
    RES_ONLINE_LIST : 0,
    
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