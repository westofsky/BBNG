<template>
    <div class="Game">
        {{ rid }}
    </div>
</template>

<script>
import * as sock_const from "../../../../common/constant/socket-constants.js";
import * as game_const from "../../../../common/constant/game-constants.js";

export default {
    name: 'Game',
    data() {
        return {
            rid: '',
            ready: false,
            game_data: {},
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
                card: card,
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
            let bbongNumber = Number(this.game_data.push_deck[this.game_data.push_deck.length - 1].slice(-1));
            let bbongCards = this.game_data.player_deck.filter(card => Number(card.slice(1)) === lastCardNumber).slice(0, 2);
            this.game_data.player_deck = this.game_data.player_deck.filter(card => !bbongCards.includes(card));

            this.$socket.value.emit(sock_const.RequestType.BBONG, {
                rid: this.$store.getters['Games/getGame_rid'],
                nickname: this.$store.getters["Users/getUser_nickname"],
                bbong_cards: bbongCards,
                draw_card: drawCard
            });
        }
    },
    mounted() {
        this.rid = this.$store.getters["Games/getGame_rid"];

        this.$socket.value.on(sock_const.ResponseType.RES_PLAYER_JOIN, (data) => { // 새로운 플레이어가 참여했을 때
            /**
             * data: {
             *  nickname: 'Player1'
             * }
             */
            this.game_data.players.push(data.nickname);
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

        });

        this.$socket.value.on(sock_const.ResponseType.RES_ROUND_START, (data) => { // 라운드가 시작되었을 때
            /**
             * data: {
             *  player_turn: 'Player1'
             * }
             */

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

</style>
