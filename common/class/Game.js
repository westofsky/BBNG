class GameRoom {
  constructor(rid, host, name, password, playerCount, currentPlayerCount, showScore, roundCount, state, players) {
    this._rid = rid;
    this._host = host;
    this._name = name;
    this._password = password;
    this._playerCount = playerCount;
    this._currentPlayerCount = currentPlayerCount;
    this._showScore = showScore;
    this._roundCount = roundCount;
    this._state = state;
    this._players = players;
  }

  toString() {
    return "rid: " + this._rid + ", " +
      "host: " + this._host + ", " +
      "name: " + this._name + ", " +
      "password: " + this._password + ", " +
      "player_count: " + this._player_count + ", " +
      "show_score: " + this._show_score + ", " +
      "round_count: " + this._round_count + ", " +
      "state: " + this._state + ". " +
      "players: " + this._players;
  }

  get rid() {
    return this._rid;
  }
  set rid(value) {
    this._rid = value;
  }

  get host() {
    return this._host;
  }
  set host(value) {
    this._host = value;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get password() {
    return this._password;
  }
  set password(value) {
    this._password = value;
  }

  get playerCount() {
    return this._playerCount;
  }
  set playerCount(value) {
    this._playerCount = value;
  }

  get currentPlayerCount() {
    return this._currentPlayerCount;
  }
  set currentPlayerCount(value) {
    this._currentPlayerCount = value;
  }

  get showScore() {
    return this._showScore;
  }
  set showScore(value) {
    this._showScore = value;
  }

  get roundCount() {
    return this._roundCount;
  }
  set roundCount(value) {
    this._roundCount = value;
  }

  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
  }

  get players() {
    return this._players;
  }
  set players(value) {
    this._players = value;
  }
}

module.exports = {
  GameRoom
}