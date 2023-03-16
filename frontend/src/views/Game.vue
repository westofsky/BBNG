<template>
    <div class="Game" @keydown="toggleScoreBoardDialog" tabIndex="0">
        <transition name="notification-fade">
            <div class="notification" v-if="showNotification">
                <div class="notification-content">
                    {{ notificationMessage }}
                </div>
            </div>
        </transition>

        <div class="InGame">
            <div class="ui-area">
                <label class="roomname">{{ room_data.name }}</label>
                <label class="username">{{ this.$store.getters["Users/getUser_nickname"] }}</label>
                <button class="menu-button">
                    <div class="hamburger-icon">
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                    <span class="menu-text">메뉴</span>
                </button>
                <button class="ready-button" v-if="room_data.state === WAITING" :class="{ ready: isReady }"
                    @click="changeReadyState">
                    {{ readyButtonText }}
                </button>
                <div class="additional-buttons" v-else>
                    <button class="additional-button" :disabled="!isBtnBbongActive" @click="onBtnBbongClicked">뽕</button>
                    <button class="additional-button" :disabled="!isBtnNatureActive" @click="onBtnNatureClicked">자연</button>
                    <button class="additional-button" :disabled="!isBtnStopActive" @click="onBtnStopClicked">스톱</button>
                </div>
            </div>
            <div class="logs">
                <Log ref="LogComponent" />
                <Chatting ref="ChattingComponent" style="width: 280px;" :request-type="chatRequestType"
                    :response-type="chatResponseType" :chatting-delay-time="0" :rid="this.room_data.rid" />
                <div class="card_deck">
                    <p>카드 뽑기</p>
                    <img src="../assets/images/cards/back_card.png" style="width:100px; height:140px;" @click="getCard()"
                        :class="{ 'clickable': isClickable }">
                </div>
            </div>
            <div class="game_zone">
                <div class="table-header">
                    <label class="round">{{ currentRoundText }}</label>
                </div>
                <div class="game_table">
                    <!-- 여기 안에 다른 card들 component들어가야함-->
                    <div class="table">
                        <div v-for="(o_card, index) in other_cards(game_data.players_data)" :key="index"
                            :class="[{ other_card: true }, { isLeft: getLeft(index) }, { isRight: getRight(index) }]"
                            :style="{
                                transform: `rotate(${180 - (get_length() - 2) * 45 + (index) * 90}deg)`,
                                top: (index == 0 || index == get_length() - 2) ? 10 + (get_length() - 3) * 30 + '%' : '0%',
                            }">
                            <Other_Card v-for="index in o_card" :key="index"
                                :image_src="require(`../assets/images/cards/back_card.png`)" :style="{
                                    width: (14 - o_card) * 0.5 + 'vw',
                                    height: (14 - o_card) * 0.7 + 'vw',
                                    'z-index': (index + 1),
                                }" />
                        </div>
                        <div class="dropped_cards">
                            <Dropped_Card v-for="(cards, key) in game_data.pushed_deck" :key="key" :name="key" :style="{
                                'position': 'absolute',
                                'top': (cards.x) + 'px',
                                'left': (cards.y) + 'px',
                            }" />
                        </div>
                        <div class="card_mine">
                            <Card v-for="(card, index) in player_data.player_deck" :key="index" :name="card"
                                :card_index="index + 1" :card_length="player_data.player_deck.length"
                                :is-draggable="isDraggable" @set-draggable="set_draggable" />
                        </div>
                    </div>

                </div>

            </div>
            <div class="menu">
            </div>
        </div>
        <ScoreBoardDialog ref="ScoreBoardDialogComponent" v-if="isScoreBoardDialogVisible" />
    </div>
</template>

<script>
import Log from '../components/Game/Log.vue';
import Card from '../components/Game/Card.vue';
import Other_Card from '../components/Game/Other_Card.vue';
import Dropped_Card from '../components/Game/Dropped_Card.vue';
import Chatting from '../components/Lobby/Chatting.vue';
import ScoreBoardDialog from '../components/Dialog/ScoreBoardDialog.vue';
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
        Dropped_Card: Dropped_Card,
        ScoreBoardDialog: ScoreBoardDialog,
    },
    data() {
        return {
            isScoreBoardDialogVisible: false,
            isReady: false,
            chatRequestType: sock_const.RequestType.SEND_MSG_TO_ROOM,
            chatResponseType: sock_const.ResponseType.BROADCAST_ROOM_MSG,
            isDraggable: false,  //test용 실 사용시 false
            isClickable: false,
            room_data: JSON.parse(this.$route.params.room_data),
            game_data: JSON.parse(this.$route.params.game_data),
            player_data: {
                player_deck: [],
            },
            last_draw_player: '',
            notificationMessage: '',
            showNotification: false,
            notificationTimeout: 0,
            containerWidth: null,
            isBtnBbongActive: false,
            isBtnNatureActive: false,
            isBtnStopActive: false,
        }
    },
    computed: {
        readyButtonText() {
            return this.isReady ? '준비완료' : '준비';
        },
        currentRoundText() {

            if (this.game_data.current_round === -1) {
                return `모든 플레이어가 준비하면 게임이 시작됩니다: ${this.room_data.ready_count} / ${this.room_data.player_limit}`;
            } else {
                return `Round ${this.game_data.current_round}`;
            }
        },
        WAITING() {
            return game_const.GameState.WAITING;
        },
        PLAYING() {
            return game_const.GameState.PLAYING;
        },
        computedWidth() {
            return `${this.containerWidth * 0.6}px`;
        },
    },
    methods: {
        set_draggable(data) {
            this.isDraggable = data.pos;
            this.player_data.player_deck.splice(data.index - 1, 1);
            this.drawCard(data.name, data.top, data.left);
        },
        other_cards(players_data) {
            let other_card = [];
            const targetNick = this.$store.getters["Users/getUser_nickname"];
            const keys = Object.keys(players_data);
            const index = keys.indexOf(targetNick);

            const newObj = {};
            if (index !== -1) {
                const slice1 = keys.slice(index);
                const slice2 = keys.slice(0, index);

                slice1.forEach(key => {
                    newObj[key] = players_data[key];
                });

                slice2.forEach(key => {
                    newObj[key] = players_data[key];
                });
            }
            for(const key of Object.keys(newObj)){
                if(key!=targetNick){
                    other_card.push(newObj[key].card_count);
                }
            }
            return other_card;
        },
        get_length() {
            return Object.keys(this.game_data.players_data).length;
        },
        getLeft(index) {
            if (parseInt((this.get_length() - 1) / 2) > index)
                return true;
            else if (this.get_length() == 2 && index == 1)
                return true;
            else
                return false;
        },
        getRight(index) {
            if (parseInt((this.get_length() - 1) / 2) <= index)
                return true;
            else
                return false;
        },
        changeReadyState() {
            if (this.isReady) {
                this.$socket.value.emit(sock_const.RequestType.NOT_READY, {
                    rid: this.room_data.rid,
                    nickname: this.$store.getters["Users/getUser_nickname"]
                });
                this.room_data.ready_count -= 1;
            } else {
                this.$socket.value.emit(sock_const.RequestType.READY, {
                    rid: this.room_data.rid,
                    nickname: this.$store.getters["Users/getUser_nickname"]
                });
                this.room_data.ready_count += 1;
            }
            this.isReady = !this.isReady;
        },
        getCard() {
            if (this.isClickable) {
                this.$socket.value.emit(sock_const.RequestType.GET_CARD, {
                    rid: this.room_data.rid,
                    nickname: this.$store.getters["Users/getUser_nickname"]
                });
                this.isDraggable = true;
                this.isClickable = false;
            }
        },
        drawCard(card, x, y) {
            this.isBtnBbongActive = false;
            this.isBtnNatureActive = false;
            this.isBtnStopActive = false;
            this.$socket.value.emit(sock_const.RequestType.DRAW_CARD, {
                rid: this.room_data.rid,
                nickname: this.$store.getters["Users/getUser_nickname"],
                card: {
                    draw_card: card,
                    x: x,
                    y: y
                },
                over_price: this.checkOverPrice()
            });
        },
        checkOverPrice() { // 플레이어의 카드 덱의 바가지 여부 확인
            if (this.player_data.player_deck.length != 3)
                return 0;

            let cardNumbers = {};
            for (let card of this.player_data.player_deck) {
                let cardNumber = String(card).substring(1);
                if (cardNumbers[cardNumber]) {
                    return cardNumber;
                } else {
                    cardNumbers[cardNumber] = true;
                }
            }

            return 0;
        },
        isBbongAvailable(last_card) { // 현재 플레이어가 뽕이 가능할 경우 true, 불가능할 경우 false
            const last_number = parseInt(String(last_card).substring(1)); // 입력된 카드에서 숫자 추출
            const number_count = {}; // 각 숫자별 카드 개수를 저장할 객체 생성

            // 플레이어 덱에서 카드 숫자별 개수 계산
            for (const card of this.player_data.player_deck) {
                const number = parseInt(String(card).substring(1));
                if (!number_count[number]) {
                    number_count[number] = 1;
                } else {
                    number_count[number]++;
                }
            }

            // 특정 숫자가 2개 있는지(뽕) 확인
            for (const [number, count] of Object.entries(number_count)) {
                if (number === last_number.toString() && count == 2) {
                    return true;
                }
            }

            return false;
        },
        isNatureAvailable() { // 현재 플레이어가 자연이 가능할 경우 true, 불가능할 경우 false
            if (this.player_data.player_deck.length % 3 == 0) {
                const counts = {};
                // 뒷 숫자만 추출하여 count를 증가시킴
                for (let i = 0; i < this.player_data.player_deck.length; i++) {
                    const num = this.player_data.player_deck[i].toString().substring(1);
                    counts[num] = (counts[num] || 0) + 1;
                }
                // 같은 숫자가 3개 이상인지 확인
                let hasThreeOfAKind = false;
                for (const num in counts) {
                    if (counts[num] >= 3) {
                        hasThreeOfAKind = true;
                        break;
                    }
                }
                if (hasThreeOfAKind)
                    return true;
                else
                    return false
            }
            return false;
        },
        isMadeAvailable() { // 플레이어 카드가 메이드 가능 상태인 경우 true, 아닐 경우 false
            if (this.player_data.player_deck.length == 6) {
                var hand_card = [];
                var two = 0, three = 0, four = 0, flag = 0, sum = 0, straight = 0, start, card_sum = 0;
                for (var i = 1; i < 13; i++) {
                    hand_card[i] = 0;
                }
                for (var i = 0; i < 6; i++) {
                    hand_card[Number(this.player_data.player_deck[i].slice(1))]++;
                    sum += Number(this.player_data.player_deck[i].slice(1));
                }
                for (var i = 1; i < 13; i++) {
                    if (straight < 6) {
                        if (hand_card[i] == 1) {
                            if (straight == 0) {
                                start = i;
                            }
                            straight++;
                        }
                        else {
                            straight = 0;
                        }
                    }
                    if (hand_card[i] == 2) {
                        two++;
                    }
                    else if (hand_card[i] == 3) {
                        three++;
                    }
                    else if (hand_card[i] == 4) {
                        four++;
                    }
                }
                return (four == 1 && two == 1) || sum <= 10 || (three == 2 || sum >= 60) || (straight == 6) || (two == 3);
            }
            return false;
        },
        isOverPriceAvailable() { // 플레이어가 바가지 상태에서 누군가가 마지막으로 낸 카드가 바가지와 동일한 숫자일 경우 true, 아닐 경우 false
            return this.game_data.players_data[this.$store.getters["Users/getUser_nickname"]].state == 2 && (
                this.player_data.player_deck[0].match(/\d+/) == this.game_data.last_card.match(/\d+/));
        },
        isSum4OrLessAvailable() { // 플레이어 카드가 2장이면서 4이하일 경우 true, 아닐 경우 false
            return (this.player_data.player_deck.length == 2 && ((parseInt(this.player_data.player_deck[0].match(/\d+/)[0]) + parseInt(this.player_data.player_deck[0].match(/\d+/)[1])) <= 4));
        },
        checkEndType() {
            if (this.player_data.player_deck.length == 6) {
                var hand_card = [];
                var two = 0, three = 0, four = 0, flag = 0, sum = 0, straight = 0, start, card_sum = 0;
                for (var i = 1; i < 13; i++) {
                    hand_card[i] = 0;
                }
                for (var i = 0; i < 6; i++) {
                    hand_card[Number(this.player_data.player_deck[i].slice(1))]++;
                    sum += Number(this.player_data.player_deck[i].slice(1));
                }
                for (var i = 1; i < 13; i++) {
                    if (straight < 6) {
                        if (hand_card[i] == 1) {
                            if (straight == 0) {
                                start = i;
                            }
                            straight++;
                        }
                        else {
                            straight = 0;
                        }
                    }
                    if (hand_card[i] == 2) {
                        two++;
                    }
                    else if (hand_card[i] == 3) {
                        three++;
                    }
                    else if (hand_card[i] == 4) {
                        four++;
                    }
                }

                if (four == 1 && two == 1) return game_const.GameEndType.TYPE_42;
                if (sum <= 10) return game_const.GameEndType.TYPE_LOW;
                if (three == 2) return game_const.GameEndType.TYPE_33;
                if (sum >= 60) return game_const.GameEndType.TYPE_HIGH;
                if (straight == 6) return game_const.GameEndType.TYPE_STRAIGHT;
                if (two == 3) return game_const.GameEndType.TYPE_222;

                return ((four == 1 && two == 1) || sum <= 10) || (three == 2 || sum >= 60) || (straight == 6) || (two == 3);
            } else {
                if (this.isOverPriceAvailable()) return game_const.GameEndType.TYPE_OVER_PRICE;
                if (this.isSum4OrLessAvailable()) return game_const.GameEndType.TYPE_BBONG_LOW;
                if (this.isNatureAvailable()) return game_const.GameEndType.TYPE_BBONG_NATURE;
            }
        },
        onBtnBbongClicked(bbongCards, drawCard) {
            this.isBtnBbongActive = false;
            this.isBtnNatureActive = false;
            this.isBtnStopActive = false;
            // for (let loop = 0; loop < this.game_data.player_deck.length; loop++) {
            //     if (bbongCards.hasOwnProperty(this.game_data.player_deck[loop])) {
            //         this.game_data.player_deck.splice(loop, 1);
            //         loop--;
            //     }
            // }

            // var drawCardIndex = this.game_data.player_deck.indexOf(drawCard.draw_card);
            // if (drawCardIndex > -1) {
            //     this.game_data.player_deck.splice(drawCardIndex, 1);
            // }

            this.$socket.value.emit(sock_const.RequestType.BBONG, {
                rid: this.room_data.rid,
                nickname: this.$store.getters["Users/getUser_nickname"],
            });
            // 뽕 할 카드 선택
        },
        onBtnNatureClicked() {
            this.isBtnBbongActive = false;
            this.isBtnNatureActive = false;
            this.isBtnStopActive = false;

        },
        onBtnStopClicked() {
            this.isBtnBbongActive = false;
            this.isBtnNatureActive = false;
            this.isBtnStopActive = false;

            this.$socket.value.emit(sock_const.RequestType.STOP, {
                rid: this.room_data.rid,
                nickname: this.$store.getters["Users/getUser_nickname"],
                overprice_nickname: this.checkEndType() == game_const.GameEndType.TYPE_OVER_PRICE ? this.last_draw_player : '',
                type: this.checkEndType()
            });
        },
        showGameNotification(message) {
            this.notificationMessage = message;
            this.showNotification = true;
            clearTimeout(this.notificationTimeout);
            this.notificationTimeout = setTimeout(() => {
                this.showNotification = false;
            }, 2000);
        },
        toggleScoreBoardDialog(event) {
            if (this.room_data.show_score && event.keyCode === 192) {
                this.isScoreBoardDialogVisible = !this.isScoreBoardDialogVisible;
                if (this.isScoreBoardDialogVisible) {
                    this.$nextTick(() => {
                        this.$refs.ScoreBoardDialogComponent.updateRoundResults(this.room_data.players, this.game_data.round_result);
                    });
                }
            }
        }
    },
    mounted() {
        const container = this.$el;
        this.containerWidth = container.clientWidth;
        this.rid = this.$store.getters["Games/getGame_rid"];

        this.$refs.LogComponent.addLog("플레이어 '" + this.$store.getters["Users/getUser_nickname"] + "'이(가) 참여하였습니다");
        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_JOIN, (data) => { // 다른 플레이어 참여
            /*
            {
                nickname : 'Nickname',
                room_data : {
                    rid: 'Room ID',
                    host: 'Nickname',
                    name: 'Roomname',
                    player_limit: 0,
                    current_player_count: 0,
                    show_score: true,
                    round_count: 0,
                    ready_count: 0,
                    state: 0,
                    players: ['Nickname', ...]
                },
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {},
                    rounds_result: []
                }
            }
            */
            this.$refs.LogComponent.addLog("플레이어 '" + data.nickname + "'이(가) 참여하였습니다");
            this.showGameNotification("플레이어 '" + data.nickname + "'이(가) 참여하였습니다");
            this.room_data = data.room_data;
            this.game_data = data.game_data;
        });
        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_LEAVE, (data) => { // 다른 플레이어 퇴장
            /*
            {
                nickname : 'Nickname',
                room_data : {
                    rid: 'Room ID',
                    host: 'Nickname',
                    name: 'Roomname',
                    player_limit: 0,
                    current_player_count: 0,
                    show_score: true,
                    round_count: 0,
                    ready_count: 0,
                    state: 0,
                    players: ['Nickname', ...]
                } ,
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {},
                    rounds_result: []
                }
            }
            */
            this.$refs.LogComponent.addLog("플레이어 '" + data.nickname + "'이(가) 방을 떠났습니다");
            this.showGameNotification("플레이어 '" + data.nickname + "'이(가) 방을 떠났습니다");
            this.room_data = data.room_data;
            this.game_data = data.game_data;
        });
        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_READY, (data) => { // 다른 플레이어 준비
            /*
            {
                nickname : 'Nickname',
                room_data : {
                    rid: 'Room ID',
                    host: 'Nickname',
                    name: 'Roomname',
                    player_limit: 0,
                    current_player_count: 0,
                    show_score: true,
                    round_count: 0,
                    ready_count: 0,
                    state: 0,
                    players: ['Nickname', ...]
                } 
            }
             */
            this.room_data = data.room_data;
            this.game_data = data.game_data;
        });
        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_NOT_READY, (data) => { // 다른 플레이어 준비해제
            /*
            {
                nickname : 'Nickname',
                room_data : {
                    rid: 'Room ID',
                    host: 'Nickname',
                    name: 'Roomname',
                    player_limit: 0,
                    current_player_count: 0,
                    show_score: true,
                    round_count: 0,
                    ready_count: 0,
                    state: 0,
                    players: ['Nickname', ...]
                } 
            }
             */
            this.room_data = data.room_data;
            this.game_data = data.game_data;
        });
        this.$socket.value.on(sock_const.ResponseType.RES_GAME_START, (data) => { // 게임 시작 알림
            /*
            {
                room_data : {
                    rid: 'Roomid',
                    host: 'Nickname',
                    name: 'Roomname',
                    player_limit: 0,
                    current_player_count: 0,
                    show_score: true/false,
                    round_count: 0,
                    ready_count: 0,
                    state: GameState.PLAYING,
                    players: ['Nickname', ...]
                },
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {},
                    rounds_result: []
                }
            }
            */
            this.room_data = data.room_data;
            this.game_data = data.game_data;
            this.$refs.LogComponent.addLog("게임이 시작되었습니다");
            this.showGameNotification("게임이 시작되었습니다");
        });
        this.$socket.value.on(sock_const.ResponseType.RES_GAME_END, () => { // 게임 종료 알림
            /*
            {
                winner: 'Nickname',
                room_data : {
                    rid: 'Room ID',
                    host: 'Nickname',
                    name: 'Roomname',
                    player_limit: 0,
                    current_player_count: 0,
                    show_score: true,
                    round_count: 0,
                    ready_count: 0,
                    state: 0,
                    players: ['Nickname', ...]
                } ,
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {},
                    rounds_result: []
                }
            }
            */
            this.$refs.LogComponent.addLog("게임이 종료되었습니다. " + data.winner + "가 우승했습니다!");
            this.showGameNotification("게임이 종료되었습니다. " + data.winner + "가 우승했습니다!");
        });
        this.$socket.value.on(sock_const.ResponseType.RES_ROUND_START, (data) => { // 라운드 시작 알림
            /*
            {
                player_turn : 'Nickname',
                round : 0,
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        }
                    },
                    pushed_deck: {},
                    rounds_result: [
                        {
                            round: 0,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            }
            */
            this.game_data = data.game_data;
            console.log("-----------누구턴인가여-----------");
            console.log(data.nickname);
            this.$refs.LogComponent.addLog(this.game_data.current_round + " 라운드가 시작되었습니다");
            this.showGameNotification(this.game_data.current_round + " 라운드가 시작되었습니다");
            this.isBtnBbongActive = false;
            this.isBtnNatureActive = this.isNatureAvailable();
            this.isBtnStopActive = false;
            if (data.player_turn == this.$store.getters["Users/getUser_nickname"]) { // 플레이어가 첫 번째 차례일 때
                this.isClickable = true;
                this.showGameNotification("당신의 차례입니다.");
            }
            else { // 플레이어가 첫 번째 차례가 아닐 때
                this.isClickable = false;
            }
        });
        this.$socket.value.on(sock_const.ResponseType.RES_ROUND_END, (data) => { // 라운드 종료 알림
            /*
            {
                winner: 'Nickname',
                type: GameEndType.TYPE_222 / GameEndType.TYPE_33 / GameEndType.TYPE_42 / GameEndType.TYPE_LOW / GameEndType.TYPE_HIGH 
                    / GameEndType.TYPE_STRAIGHT / GameEndType.TYPE_OVER_PRICE / GameEndType.TYPE_BBONG_LOW / GameEndType.TYPE_BBONG_NATURE,
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {
                        'S1': {
                            x: 0,
                            y: 0,
                        },
                        ...
                    },
                    rounds_result: [
                        {
                            round: 1,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            }            
            */
            this.game_data = data.game_data;

            this.$refs.LogComponent.addLog(this.game_data.current_round + " 라운드가 종료되었습니다. 이번 라운드 승자는 " + data.winner + "입니다");
            this.showGameNotification(this.game_data.current_round + " 라운드가 종료되었습니다. 이번 라운드 승자는 " + data.winner + "입니다");
        });
        this.$socket.value.on(sock_const.ResponseType.RES_CHANGE_TURN, (data) => { // 턴 변경 알림
            /*
            {
                nickname : 'Nickname',
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {
                        'S1': {
                            x: 0,
                            y: 0,
                        },
                        ...
                    },
                    rounds_result: [
                        {
                            round: 1,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            */
            this.game_data = data.game_data;
            console.log("-----------누구턴인가여-----------");
            console.log(data.nickname);
            if (data.nickname == this.$store.getters["Users/getUser_nickname"]) { // 플레이어의 차례일 때
                this.isClickable = true;
                this.isBtnNatureActive = this.isNatureAvailable();
                this.isBtnStopActive = this.isSum4OrLessAvailable();
                this.showGameNotification("당신의 차례입니다.");
            } else { // 플레이어의 차례가 아닐 때
                this.isClickable = false;
                this.isBtnStopActive = this.isOverPriceAvailable();
            }
        });
        this.$socket.value.on(sock_const.ResponseType.RES_SPREAD_CARD, (data) => { // 무작위로 뽑은 카드 5장 묶음들을 각 플레이어에게 전달
            /*
            {
                cards : ['Card Type','Card Type','Card Type','Card Type','Card Type'],
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {
                        'S1': {
                            x: 0,
                            y: 0,
                        },
                        ...
                    },
                    rounds_result: [
                        {
                            round: 1,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            }
            */
            this.game_data = data.game_data;
            this.player_data.player_deck = data.cards;
            this.$refs.LogComponent.addLog('카드 5장을 받았습니다');
        });
        this.$socket.value.on(sock_const.ResponseType.RES_GET_CARD, (data) => { // 덱에서 뽑은 카드 전달
            /*
            {
                card : 'Card Type',
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {
                        'S1': {
                            x: 0,
                            y: 0,
                        },
                        ...
                    },
                    rounds_result: [
                        {
                            round: 1,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            }
            */
            this.game_data = data.game_data;
            if (data.nickname === this.$store.getters["Users/getUser_nickname"]) {
                this.player_data.player_deck.push(data.card);
                this.isBtnNatureActive = this.isNatureAvailable();
                this.isBtnStopActive = this.isMadeAvailable();
            }
        });
        this.$socket.value.on(sock_const.ResponseType.RES_DRAW_CARD, (data) => { // 플레이어가 내려놓은 카드 정보 전달
            /*
            {
                nickname : 'Nickname',
                draw_card: {
                    card: 'Card Type',
                    x: 0,
                    y: 0
                },
                over_price : 0,
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {
                        'S1': {
                            x: 0,
                            y: 0,
                        },
                        ...
                    },
                    rounds_result: [
                        {
                            round: 1,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            }
            */
            this.last_draw_player = data.nickname;
            this.game_data = data.game_data;
            this.isBtnBbongActive = this.isBbongAvailable(data.draw_card.card);
            //뽕 가능 여부 확인 해야함 가능하면 버튼 활성화, 
        });
        this.$socket.value.on(sock_const.ResponseType.RES_BBONG, (data) => { // 뽕 이벤트 발생 알림
            /*
            {
                nickname : 'Nickname',
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {
                        'S1': {
                            x: 0,
                            y: 0,
                        },
                        ...
                    },
                    rounds_result: [
                        {
                            round: 1,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            }            
            */
            this.game_data = data.game_data;
        });
        this.$socket.value.on(sock_const.ResponseType.RES_DRAW_BBONG_CARD, (data) => { // 플레이어가 내려놓은 뽕에 해당되는 카드와 함께 버린 카드, 바가지 여부 반환
            /*
            {
                nickname : 'Nickname',
                bbong_cards : [
                    {
                        card: 'Card Type',
                        x: 0,
                        y: 0 
                    },
                    {
                        card: 'Card Type',
                        x: 0,
                        y: 0
                    }
                ],
                draw_card: {
                    card: 'Card Type',
                    x: 0,
                    y: 0
                },
                over_price : 0,
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {
                        'S1': {
                            x: 0,
                            y: 0,
                        },
                        ...
                    },
                    rounds_result: [
                        {
                            round: 1,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            }            
            */
            this.game_data = data.game_data;
        });
        this.$socket.value.on(sock_const.ResponseType.RES_NATURE, (data) => { // 플레이어가 내려놓은 자연에 해당되는 카드와 함께 버린 카드, 바가지 여부 반환
            /*
            {
                nickname : 'Nickname',
                nature_cards : [
                    {
                        card: 'Card Type',
                        x: 0,
                        y: 0 
                    },
                    {
                        card: 'Card Type',
                        x: 0,
                        y: 0
                    },
                    {
                        card: 'Card Type',
                        x: 0,
                        y: 0
                    }
                ],
                draw_card: {
                    card: 'Card Type',
                    x: 0,
                    y: 0
                },
                over_price : 0,
                game_data: {
                    current_round: 0,
                    players_data: {
                        'Nickname': {
                            turn_count: 0,
                            card_count: 0,
                            state: 0
                        },
                        ...
                    },
                    pushed_deck: {
                        'S1': {
                            x: 0,
                            y: 0,
                        },
                        ...
                    },
                    rounds_result: [
                        {
                            round: 1,
                            players_score: {
                                'Nickname': 0,
                                ...
                            }
                        },
                        ...
                    ]
                }
            }
            */
            this.game_data = data.game_data;
        });
    }
}
</script>
<style scoped>
.Game {
    width: 100%;
    height: 100%;
    position: relative;
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
    background-color: rgba(255, 255, 255, 0);
    pointer-events: none;
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
    pointer-events: auto;
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
    pointer-events: auto;
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

.additional-buttons {
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    flex-wrap: wrap;
}

.additional-button {
    pointer-events: auto;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background-color: orange;
}

.additional-button:disabled {
    background-color: gray;
    pointer-events: none;
}

.additional-button:hover:active {
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
    height: 6%;
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
    position: relative;
    height: 94%;
}

.game_zone .game_table .table {
    width: 60%;
    /* 요소의 기본 크기 설정 */
    height: 0;
    padding-bottom: 60%;
    /* height를 0으로 하고 padding을 %로 지정하여 원 모양으로 만듦 */
    border-radius: 50%;
    /* 모서리를 둥글게 만듦 */
    background-color: #333;
    /* 배경색 지정 */
    position: relative;
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
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
}

.dropped_cards {
    position: absolute;
    display: flex;
    bottom: 0;
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
    left: -40%;
}

.isRight {
    right: -40%;
}

.card_deck {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.card_deck .clickable {
    cursor: pointer;
}
</style>
