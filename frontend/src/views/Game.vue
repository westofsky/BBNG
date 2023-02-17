<template>
    <div class="Game">
        <transition name="notification-fade">
            <div class="notification" v-if="showNotification">
                <div class="notification-content">
                    {{ notificationMessage }}
                </div>
            </div>
        </transition>
        <div class="InGame">
            <div class="header-area">
                <div class="header-left">
                    <label class="roomname">{{ room_data.room_name }}</label>
                </div>
                <div class="header-right">
                    <label class="username">{{ room_data.user_name }}</label>
                    <button class="menu-button">
                        <div class="hamburger-icon">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                        <span class="menu-text">메뉴</span>
                    </button>
                </div>
            </div>
            <div class="logs">
                <Log ref="LogComponent" />
                <Chatting ref="ChattingComponent" style="width: 280px;" :request-type="chatRequestType"
                    :response-type="chatResponseType" :chatting-delay-time="0" :rid="rid" />
            </div>
            <div class="game_zone">
                <div class="table-header">
                    <label class="round">Round {{ game_data.current_round }}</label>
                </div>
                <div class="game_table">
                    <!-- 여기 안에 다른 card들 component들어가야함-->
                    <div class="table">
                        <div class="other_card">
                            <Other_Card v-for="(card, index) in other_cards" :key="card.src" :image_src="card.src" :style="{
                                'z-index': (index + 1),
                            }" />
                        </div>
                        <div class="other_card2">
                            <Other_Card v-for="(card, index) in other_cards" :key="card.src" :image_src="card.src" :style="{
                                'z-index': (index + 1),
                            }" />
                        </div>
                        <div class="card_mine">
                            <Card v-for="card in cards" :key="card.src" :image_src="card.src" />
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="menu">
            </div>
        </div>
    </div>
</template>

<script>
import Log from '../components/Game/Log.vue';
import Card from '../components/Game/Card.vue';
import Other_Card from '../components/Game/Other_Card.vue';
import Chatting from '../components/Lobby/Chatting.vue';
import * as sock_const from "../../../common/constant/socket-constants.js";
import * as game_const from "../../../common/constant/game-constants.js";
export default {
    name: 'Game',
    components: {
        Log: Log,
        Chatting: Chatting,
        Card: Card,
        Other_Card: Other_Card,
    },
    data() {
        return {
            rid: '',
            ready: false,
            chatRequestType: sock_const.RequestType.SEND_MSG_TO_ROOM,
            chatResponseType: sock_const.ResponseType.BROADCAST_ROOM_MSG,
            cards: [
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/heart_1.png') },
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/clover_2.png') },
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/heart_3.png') },
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/heart_4.png') },
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/heart_5.png') },
            ],
            other_cards: [
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/back_card.png') },
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/back_card.png') },
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/back_card.png') },
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/back_card.png') },
                { prevPosX: 0, prevPosY: 0, src: require('../assets/images/cards/back_card.png') },
            ],
            room_data: JSON.parse(this.$route.params.room_data),
            game_data: {
                players: [],
                current_player: '',
                player_deck: [],
                other_player_deck: {},
                push_deck: [],
                round_result: [],
                current_round: 0,
            },
            notificationMessage: '',
            showNotification: false,
            notificationTimeout: 0,
        }
    },
    methods: {
        changeReadyState() {
            if (this.ready) {
                this.$socket.value.emit(sock_const.RequestType.NOT_READY, {
                    rid: this.$store.getters["Games/getGame_rid"],
                    nickname: this.$store.getters["Users/getUser_nickname"]
                });
            } else {
                this.$socket.value.emit(sock_const.RequestType.READY, {
                    rid: this.$store.getters["Games/getGame_rid"],
                    nickname: this.$store.getters["Users/getUser_nickname"]
                });
            }
            this.ready = !this.ready;
        },
        getCard() {
            this.$socket.value.emit(sock_const.RequestType.GET_CARD, {
                rid: this.$store.getters["Games/getGame_rid"],
                nickname: this.$store.getters["Users/getUser_nickname"]
            });
        },
        drawCard(card, x, y) {
            this.game_data.player_deck
            this.$socket.value.emit(sock_const.RequestType.DRAW_CARD, {
                rid: this.$store.getters["Games/getGame_rid"],
                nickname: this.$store.getters["Users/getUser_nickname"],
                card: { [card]: { x: [x], y: [y] } },
                over_price: this.checkOverPrice()
            });
        },
        checkOverPrice() { // 플레이어의 카드 덱의 바가지 여부 확인
            let cardNumbers = {};
            for (let card of this.game_data.player_deck) {
                let cardNumber = card.substring(1);
                if (cardNumbers[cardNumber]) {
                    return cardNumber;
                } else {
                    cardNumbers[cardNumber] = true;
                }
            }
            return 0;
        },
        bbong(bbongCards, drawCard) {
            for (let loop = 0; loop < this.game_data.player_deck.length; loop++) {
                if (bbongCards.hasOwnProperty(this.game_data.player_deck[loop])) {
                    this.game_data.player_deck.splice(loop, 1);
                    loop--;
                }
            }

            var drawCardIndex = this.game_data.player_deck.indexOf(drawCard.draw_card);
            if (drawCardIndex > -1) {
                this.game_data.player_deck.splice(drawCardIndex, 1);
            }

            this.$socket.value.emit(sock_const.RequestType.BBONG, {
                rid: this.$store.getters['Games/getGame_rid'],
                nickname: this.$store.getters["Users/getUser_nickname"],
                bbong_cards: bbongCards,
                draw_card: drawCard
            });
        },
        showGameNotification(message) {
            this.notificationMessage = message;
            this.showNotification = true;
            clearTimeout(this.notificationTimeout);
            this.notificationTimeout = setTimeout(() => {
                this.showNotification = false;
            }, 2000);
        }
    },
    mounted() {
        this.rid = this.$store.getters["Games/getGame_rid"];
        this.$refs.LogComponent.addLog("플레이어 '" + this.$store.getters["Users/getUser_nickname"] + "'이(가) 참여하였습니다");
        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_JOIN, (data) => { // 새로운 플레이어가 참여했을 때
            /**
             * data: {
             *  nickname: 'Player1'
             * }
             */
            this.game_data.players.push(data.nickname);
            this.$refs.LogComponent.addLog("플레이어 '" + data.nickname + "'이(가) 참여하였습니다");
            this.showGameNotification("플레이어 '" + data.nickname + "'이(가) 참여하였습니다");
        });
        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_LEAVE, (data) => { // 다른 플레이어가 방을 떠났을 때
            /**
             * data: {
             *  nickname: 'Player1'
             * }
             */
            this.game_data.players = this.game_data.players.filter((player) => {
                return player != data.nickname;
            });
            this.$refs.LogComponent.addLog("플레이어 '" + data.nickname + "'이(가) 방을 떠났습니다");
            this.showGameNotification("플레이어 '" + data.nickname + "'이(가) 방을 떠났습니다");
        });
        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_READY, (data) => { // 다른 플레이어가 준비완료 했을 때
            /**
             * data: {
             *  nickname: 'Player1'
             * }
             */
        });
        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_NOT_READY, (data) => { // 다른 플레이어가 준비해제 했을 때
            /**
             * data: {
             *  nickname: 'Player1'
             * }
             */
        });
        this.$socket.value.on(sock_const.ResponseType.RES_GAME_START, () => { // 게임이 시작되었을 때
            this.$refs.LogComponent.addLog("게임이 시작되었습니다");
            this.showGameNotification("게임이 시작되었습니다");
        });
        this.$socket.value.on(sock_const.ResponseType.RES_ROUND_START, (data) => { // 라운드가 시작되었을 때
            /**
             * data: {
             *  player_turn: 'Player1',
             *  round: 1
             * }
             */
            this.$refs.LogComponent.addLog(data.round + " 라운드가 시작되었습니다");
            this.showGameNotification(data.round + " 라운드가 시작되었습니다");
            if (data.player_turn == this.$store.getters["Users/getUser_nickname"]) { // 플레이어가 첫 번째 차례일 때
            } else { // 플레이어가 첫 번째 차례가 아닐 때
            }
        });
        this.$socket.value.on(sock_const.ResponseType.RES_SPREAD_CARD, (data) => { // 카드를 나눠받았을 때
            /**
             * data: {
             *  cards: ['C1', 'C2', 'C3', 'C4', 'C5']
             * } 
             */
            this.game_data.player_deck = data.cards;
            this.$refs.LogComponent.addLog('카드 5장을 받았습니다');
        });
        this.$socket.value.on(sock_const.ResponseType.RES_CHANGE_TURN, (data) => { // 차례가 바뀌었을 때
            /**
             * data: {
             *  player_turn: 'Player1'
             * }
             */
            if (data.player_turn == this.$store.getters["Users/getUser_nickname"]) { // 플레이어의 차례일 때
            } else { // 플레이어의 차례가 아닐 때
            }
        });
        this.$socket.value.on(sock_const.ResponseType.RES_GET_CARD, (data) => { // 카드를 한장 받았을 때
            /**
             * data: {
             *  card: 'C1'
             * }
             */
            this.game_data.player_deck.push(data.card);
        });
        this.$socket.value.on(sock_const.ResponseType.RES_DRAW_CARD, (data) => { // 다른 플레이어가 카드를 한장 냈을 때
            /**
             * data: {
             *  over_price: 1,
             *  card: {
             *      draw_card: 'C1',
             *      x: 0,
             *      y: 0,
             *  }
             * }
             */
            this.game_data.push_deck.push({
                [data.card.draw_card]: {
                    x: data.card.x,
                    y: data.card.y
                }
            });
        });
    }
}
</script>
<style scoped>
.Game {
    width: 100%;
    height: 100%;
}

.InGame {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E1D5D5;
}

.header-area {
    position: fixed;
    left: 8px;
    right: 8px;
    top: 8px;
    display: flex;
}

.header-left {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-start;
}
.header-right {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
}

.roomname {
    font-weight: bold;
    font-size: 32pt;
}

.username {
    font-weight: bold;
    font-size: 16pt;
    margin-right: 32px;
    padding: 8px;
}

.menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 8px;
    border: none;
    background-color: #444;
    border-radius: 8px;
    cursor: pointer;
}

.menu-button:hover {
    background-color: #555;
}

.menu-button:active {
    background-color: #474747;
}

.menu-text {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 8px;
    margin-left: 8px;
    color: #fff;
}

.hamburger-icon {
    width: 24px;
    height: 20px;
    margin-left: 8px;
    margin-right: 8px;
    position: relative;
}

.line {
    width: 100%;
    height: 2px;
    background-color: #000;
    position: absolute;
    left: 0;
}

.hamburger-icon .line:nth-child(1) {
    top: 0;
}

.hamburger-icon .line:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
}

.hamburger-icon .line:nth-child(3) {
    bottom: 0;
}

.menu-button:hover .hamburger-icon .line {
    background-color: #fff;
}

.hamburger-icon .line {
    background-color: #fff;
}

.logs {
    padding-left: 10px;
    padding-right: 10px;
}

.table-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
}

.round {
    font-weight: bold;
    font-size: 24pt;
}

.game_zone {
    width: 70%;
    height: 100%;
    margin: 0 auto;
}

.game_zone .game_table {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    position: relative
}

.game_zone .game_table .table {
    width: 40rem;
    height: 40rem;
    border-radius: 20rem;
    background-color: #333;
}

.game_zone .game_table .table .other_card {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10%;
    left: 10%;
    transform: rotate(-225deg);
}

.game_zone .game_table .table .other_card2 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10%;
    right: 10%;
    transform: rotate(-135deg);
}

.card_mine {
    position: absolute;
    display: flex;
    bottom : 0;
    left : 0;
    right : 0;
    justify-content: center;
    align-items: center;
}

.card_mine .nickname {}

.notification {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    max-width: 30%;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    z-index: 2;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.75);
}

.notification-content {
    padding: 16px;
    color: white;
    text-align: center;
    opacity: 1;
}

.notification-fade-enter-active,
.notification-fade-leave-active {
    transition: opacity 1s;
}

.notification-fade-enter,
.notification-fade-leave-to {
    opacity: 0;
}
</style>
