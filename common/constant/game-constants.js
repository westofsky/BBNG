const GameState = {
    WAITING: 0,
    PLAYING: 0,
}

function initGameConstants() {
    var count = 0;
    for(var key in GameState){
        GameState[key] = count;
        count++;
    }
    Object.freeze(GameState);
}

module.exports = {
    GameState
    , initGameConstants
}