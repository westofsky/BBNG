const ChatroomType = {
    LOBBY: '',
    INGAME: '',
}

const RequestType = {
    JOIN_LOBBY: '',
    LEAVE_LOBBY: '',
    ADD_FRIEND: '',
    DELETE_FRIEND: '',
    INVITE_FRIEND: '',
    ACCEPT_INVITE: '',
    CREATE_ROOM: '',
    DESTROY_ROOM: '',
    JOIN_ROOM: '',
    LEAVE_ROOM: '',
    READY_ROOM: '',
    NOT_READY_ROOM: '',
    JOIN_NORMAL_QUEUE: '',
    LEAVE_NORMAL_QUEUE: '',
    ACCEPT_NORMAL_QUEUE: '',
    REJECT_NORMAL_QUEUE: '',
    JOIN_RANK_QUEUE: '',
    LEAVE_RANK_QUEUE: '',
    ACCEPT_RANK_QUEUE: '',
    REJECT_RANK_QUEUE: '',
    SEND_MSG_TO_LOBBY: '',
    SEND_MSG_TO_ROOM: '',
    SEND_MSG_TO_INGAME: '',
}

const ResponseType = {
    RES_JOIN_LOBBY: '',
    RES_LEAVE_LOBBY: '',
    RES_ADD_FRIEND: '',
    RES_DELETE_FRIEND: '',
    RES_INVITE_FRIEND: '',
    RES_ACCEPT_INVITE: '',
    RES_CREATE_ROOM: '',
    RES_DESTROY_ROOM: '',
    RES_JOIN_ROOM: '',
    RES_LEAVE_ROOM: '',
    RES_READY_ROOM: '',
    RES_NOT_READY_ROOM: '',
    RES_JOIN_NORMAL_QUEUE: '',
    RES_LEAVE_NORMAL_QUEUE: '',
    RES_ACCEPT_NORMAL_QUEUE: '',
    RES_REJECT_NORMAL_QUEUE: '',
    RES_JOIN_RANK_QUEUE: '',
    RES_LEAVE_RANK_QUEUE: '',
    RES_ACCEPT_RANK_QUEUE: '',
    RES_REJECT_RANK_QUEUE: '',
    BROADCAST_LOBBY_MSG: '',
    BROADCAST_ROOM_MSG: '',
    BROADCAST_INGAME_MSG: '',
}

function initSocketConstants() {
    var count = 0;
    for(var key in ChatroomType){
        ChatroomType[key] = String(count);
        count++;
    }
    Object.freeze(ChatroomType);

    for(var key in RequestType) {
        RequestType[key] = String(count);
        count++;
    }
    Object.freeze(RequestType);

    for(var key in ResponseType) {
        ResponseType[key] = String(count);
        count++;
    }
    Object.freeze(ResponseType);
}

module.exports = {
    ChatroomType
    , RequestType
    , ResponseType
    , initSocketConstants
}