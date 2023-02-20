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
            <div class="ui-area">
                <label class="roomname">{{ room_data.room_name }}</label>
                <label class="username">{{ room_data.user_name }}</label>
                <button class="menu-button">
                    <div class="hamburger-icon">
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                    <span class="menu-text">메뉴</span>
                </button>
                <button class="ready-button" :class="{ ready: isReady }" @click="changeReadyState">
                    {{ readyButtonText }}
                </button>
            </div>
            <div class="logs">
                <Log ref="LogComponent" />
                <Chatting ref="ChattingComponent" style="width: 280px;" :request-type="chatRequestType"
                    :response-type="chatResponseType" :chatting-delay-time="0" :rid="rid" />
                <div class = "card_deck">
                    <p>카드 뽑기</p>
                    <img src = "../assets/images/cards/back_card.png" style="width:100px; height:140px;" @click = "getCard()">
                </div>
            </div>
            <div class="game_zone">
                <div class="table-header">
                    <label class="round">Round {{ game_data.current_round }}</label>
                </div>
                <div class="game_table">
                    <!-- 여기 안에 다른 card들 component들어가야함-->
                    <div class="table">
                        <div v-for="(o_card, index) in game_data.other_player_deck" :key="index"
                        :class="[{other_card : true},{isLeft : getLeft(index)}, {isRight : getRight(index)}]"
                        :style = "{
                            transform: `rotate(${180-(game_data.other_player_deck.length-1)*45+(index)*90}deg)`,
                            top : (index==0 || index==game_data.other_player_deck.length-1) ? 10+(game_data.other_player_deck.length-2)*30+'%': '0%',
                        }">
                            <Other_Card v-for="index in Object.values(o_card)[0].length" :key="index" :image_src="require(`../assets/images/cards/back_card.png`)" :style="{
                                'z-index': (index + 1),
                            }" />
                        </div>
                        <div class="card_mine">
                            <Card v-for="(card, index) in game_data.player_deck" :key="index"
                                :image_src="require(`../assets/images/cards/${card}.png`)" :card_index="index + 1"
                                :card_length="game_data.player_deck.length" :is-draggable="isDraggable"
                                @set-draggable="set_draggable" />
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
import { is } from '@babel/types';
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
            isReady: false,
            chatRequestType: sock_const.RequestType.SEND_MSG_TO_ROOM,
            chatResponseType: sock_const.ResponseType.BROADCAST_ROOM_MSG,
            isDraggable : true,  //test용 실 사용시 false
            room_data: JSON.parse(this.$route.params.room_data),
            game_data: {
                players: [],
                ready_count: 0,
                current_round: 0,
                current_player: '',
                player_deck: [], // test용 실 사용시 []
                other_player_deck : [
                ],
                push_deck: [],
                round_result: [],
            },
            notificationMessage: '',
            showNotification: false,
            notificationTimeout: 0,
        }
    },

    methods: {
        set_draggable(data) {
            this.isDraggable = data;
        },
        getLeft(index) {
            if (parseInt(this.game_data.other_player_deck.length / 2) > index)
                return true;
            else if(this.game_data.other_player_deck.length==3 && index == 1)
                return true;
            else
                return false;
        },
        getRight(index) {
            if (parseInt(this.game_data.other_player_deck.length / 2) <= index)
                return true;
            else
                return false;
        },
        changeReadyState() {
            if (this.isReady) {
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
            this.isReady = !this.isReady;
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
    computed: {
        readyButtonText() {
            return this.isReady? '준비완료':'준비';
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
            this.game_data.current_round = data.round + 1;
            if (data.player_turn == this.$store.getters["Users/getUser_nickname"]) { // 플레이어가 첫 번째 차례일 때
                this.isDraggable = true;
            } 
            else { // 플레이어가 첫 번째 차례가 아닐 때
                this.isDraggable = false;
                
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
                this.isDraggable = true;
            } else { // 플레이어의 차례가 아닐 때
                this.isDraggable = false;
            }
        });
        this.$socket.value.on(sock_const.ResponseType.RES_GET_CARD, (data) => { // 카드를 한장 받았을 때
            /**
             * data: {
             *  card: 'C1'
             * }
             */
            this.game_data.player_deck.push(data.card);
            // this.game_data.player_deck 이 6장 or 3장일때 메이드 확인해야함
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
            //뽕 가능 여부 확인 해야함 가능하면 버튼 활성화, 
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

.ui-area {
    position: absolute;
    width: 100%;
    height: 100%;
}

.roomname {
    position: absolute;
    left: 8px;
    top: 8px;
    font-weight: bold;
    font-size: 32pt;
}

.username {
    position: absolute;
    right: 128px;
    top: 8px;
    font-weight: bold;
    font-size: 16pt;
    margin-right: 32px;
    padding: 8px;
}

.menu-button {
    position: absolute;
    right: 8px;
    top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
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

.ready-button {
    position: absolute;
    bottom: 8px;
    right: 8px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background-color: orange;
  }
  
  .ready-button.ready {
    background-color: green;
  }
  
  .ready-button:hover {
    background-color: darkorange;
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
    width: 40vw;
    height: 40vw;
    border-radius: 20rem;
    background-color: #333;
}

.game_zone .game_table .table .other_card {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game_zone .game_table .table .other_card2 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10%;
    right: 0;
    transform: rotate(225deg);
}

.game_zone .game_table .table .other_card3 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 70%;
    right: 0;
    transform: rotate(315deg);
}

.game_zone .game_table .table .other_card4 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 70%;
    left: 0;
    transform: rotate(45deg);
}

.card_mine {
    position: absolute;
    display: flex;
    bottom: -10%;
    left: 0;
    right: 0;
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

.isLeft {
    left: 0;
}

.isRight{
    right : 0;
}
.card_deck{
    display:flex;
    justify-content : center;
    align-items : center;
    flex-direction: column;
}

.card_deck img{
    cursor: pointer;
}

</style>
