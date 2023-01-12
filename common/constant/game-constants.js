const GameState = {
    WAITING: '',
    PLAYING: '',
}

function initGameConstants() {
    var count = 0;
    for(var key in GameState){
        GameState[key] = String(count);
        count++;
    }
    Object.freeze(GameState);
}

module.exports = {
    GameState
    , initGameConstants
}