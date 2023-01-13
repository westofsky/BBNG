class Player {
    constructor(socket, oid, nickname) {
        this._socket = socket;
        this._oid = oid;
        this._nickname = nickname;
    }

    get socket() {
        return this._socket;
    }

    set socket(value) {
        this._socket = value;
    }

    get oid() {
        return this._oid;
    }

    set oid(value) {
        this._oid = value;
    }

    get nickname() {
        return this._nickname;
    }

    set nickname(value) {
        this._nickname = value;
    }

    toString() {
        return "socket: " + this._socket + ", " +
            "oid: " + this._oid + ", " +
            "name: " + this._nickname;
    }
}

module.exports = {
    Player
}