const ChatroomType = {
    LOBBY: '',
    INGAME: '',
}

const RequestType = {
    JOIN_LOBBY: '',
    LEAVE_LOBBY: '',
    SEND_MSG_TO_LOBBY: '',
}

const ResponseType = {
    BROADCAST_LOBBY_MSG: '',
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