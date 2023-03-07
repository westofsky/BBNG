const GameState = {
    WAITING: 0,
    PLAYING: 0,
}

const GameEndType = {
    TYPE_222: 0,
    TYPE_33: 0,
    TYPE_42: 0,
    TYPE_LOW: 0,
    TYPE_HIGH: 0,
    TYPE_STRAIGHT: 0,
    TYPE_OVER_PRICE: 0,
    TYPE_BBONG_LOW: 0,
    TYPE_BBONG_NATURE: 0,
}

function initGameConstants() {
    var count = 0;
    for(var key in GameState){
        GameState[key] = count;
        count++;
    }

    for(var key in GameEndType) {
        GameEndType[key] = count;
        count++;
    }

    Object.freeze(GameState);
}

module.exports = {
    GameState,
    GameEndType,
    initGameConstants
}