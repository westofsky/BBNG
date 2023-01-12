class GameRoom {
    constructor(rid, host, name, password,player_count, show_score, round_count, state) {
        this._rid = rid;
        this._host = host;
        this._name = name;
        this._password = password;
        this._player_count = player_count;
        this._show_score = show_score;
        this._round_count = round_count;
        this._state = state;
    }

    get rid() {
        return this._rid;
      }
    
      set rid(rid) {
        this._rid = rid;
      }
    
      get host() {
        return this._host;
      }
    
      set host(host) {
        this._host = host;
      }
    
      get name() {
        return this._name;
      }
    
      set name(name) {
        this._name = name;
      }
    
      get password() {
        return this._password;
      }
    
      set password(password) {
        this._password = password;
      }
    
      get player_count() {
        return this._player_count;
      }
    
      set player_count(player_count) {
        this._player_count = player_count;
      }
    
      get show_score() {
        return this._show_score;
      }
    
      set show_score(show_score) {
        this._show_score = show_score;
      }
    
      get round_count() {
        return this._round_count;
      }

      set round_count(round_count) {
        this._round_count = round_count;
      }

      get state() {
        return this._state;
      }

      set state(state) {
        this._state = state;
      }
}