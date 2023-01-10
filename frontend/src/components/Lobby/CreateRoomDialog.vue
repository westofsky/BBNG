<template>
    <Transition name="CreateRoomDialog">
        <div v-if="show" class="CreateRoomDialog-Mask" @keyup.esc="$emit('close')" tabindex="0">
            <div class="CreateRoomDialog-Wrapper">
                <div class="CreateRoomDialog-Container">
                    <div class="CreateRoomDialog-Header">
                        <label class="CreateRoomDialog-Title">새로운 방 만들기</label>
                    </div>
                    <div class="CreateRoomDialog-Body">
                        <div class="OptionGroup">
                            <label class="OptionTitle">방 이름</label>
                            <div class="VerticalLine" />
                            <div class="OptionArea">
                                <input class="Name" type="text" ref="Name" v-model="name" />
                            </div>
                        </div>
                        <div class="OptionGroup">
                            <label class="OptionTitle">비밀번호</label>
                            <div class="VerticalLine" />
                            <div class="OptionArea">
                                <input class="Password" type="text" v-model="password"/>
                            </div>
                        </div>
                        <div class="OptionGroup">
                            <label class="OptionTitle">플레이어 수</label>
                            <div class="VerticalLine" />
                            <div class="OptionArea">
                                <div class="PlayerRadioGroup">
                                    <input class="Player" type="radio" value="player_3" v-model="playerCount">
                                    <label class="PlayerLabel">3명</label>
                                </div>
                                <div class="PlayerRadioGroup">
                                    <input class="Player" type="radio" value="player_4" v-model="playerCount">
                                    <label class="PlayerLabel">4명</label>
                                </div>
                                <div class="PlayerRadioGroup">
                                    <input class="Player" type="radio" value="player_5" v-model="playerCount">
                                    <label class="PlayerLabel">5명</label>
                                </div>
                            </div>
                        </div>
                        <div class="OptionGroup">
                            <label class="OptionTitle">점수 표시</label>
                            <div class="VerticalLine" />
                            <div class="OptionArea">
                                <input class="Player" type="checkbox" value="show" v-model="showScore">
                                <label class="ShowScoreLabel">게임 중 표시</label>
                            </div>
                        </div>
                        <div class="OptionGroup">
                            <label class="OptionTitle">라운드 수</label>
                            <div class="VerticalLine" />
                            <div class="OptionArea">
                                <div class="PlayerRadioGroup">
                                    <input class="Player" type="radio" value="round_10" v-model="roundCount">
                                    <label class="RoundLabel">10회</label>
                                </div>
                                <div class="PlayerRadioGroup">
                                    <input class="Player" type="radio" value="round_15" v-model="roundCount">
                                    <label class="RoundLabel">15회</label>
                                </div>
                                <div class="PlayerRadioGroup">
                                    <input class="Player" type="radio" value="round_20" v-model="roundCount">
                                    <label class="RoundLabel">20회</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="CreateRoomDialog-Footer">
                        <div class="BtnCancel" @click="$emit('close')">
                            <label class="BtnText">취소</label>
                        </div>
                        <div class="BtnCreate" @click="createRoom">
                            <label class="BtnText">생성</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import io from 'socket.io-client';
import * as sock_const from "../../constants/socket-constants.js";

export default {
    name: 'CreateRoomDialog',
    data() {
        return {
            name: '',
            password: '',
            playerCount: 'player_3',
            showScore: false,
            roundCount: 'round_10',
        }
    },
    props: {
        show: Boolean,
        socket: { type: io.Socket, required: true },
    },
    methods: {
        mounted() {
        },
        init() {
            this.name = '';
            this.password = '';
            this.playerCount = 'player_3';
            this.showScore = false;
            this.roundCount = 'round_10';
            this.$nextTick(() => this.$refs.Name.focus());
        },
        createRoom() {
            this.$emit('close');
            this.socket.emit(sock_const.RequestType.CREATE_ROOM, {
                oid: this.$store.getters["Users/getUser_nickname"]
                , nickname: this.$store.getters["Users/getUser_oid"]
                , room_name: this.name
                , room_password: this.password
                , room_player_count: this.playerCount
                , room_show_score: this.showScore
                , room_round_count: this.roundCount
            });
        }
    }
}
</script>

<style scoped>
.CreateRoomDialog-Mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    text-align: center;
}

.CreateRoomDialog-Wrapper {
    display: table-cell;
    vertical-align: middle;
}

.CreateRoomDialog-Container {
    width: 480px;
    margin: 0px auto;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
    display: inline-block;
}

.CreateRoomDialog-Header {
    height: 48px;
    display: flex;
    justify-content: center;
    background-color: rgb(70, 199, 135);
}

.CreateRoomDialog-Title {
    font-size: 18pt;
    font-weight: bold;
    padding: 8px;
    color: #ffffff;
    user-select: none;
}

.CreateRoomDialog-Body {
    display: flex;
    flex-direction: column;
    padding: 16px 0px;
}

.CreateRoomDialog-Footer {
    height: 48px;
    background-color: #525252;
    display: flex;
    flex-direction: row;
}

.OptionGroup {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.OptionTitle {
    width: 35%;
    font-weight: bold;
    color: #525252;
    font-size: 16pt;
    padding: 8px;
    user-select: none;
}

.VerticalLine {
    width: 2px;
    height: 24px;
    background-color: #6b6b6b;
    margin-right: 16px;
}

.OptionArea {
    flex: 1;
    display: flex;
    padding: 16px;
    justify-content: center;
}

.Name {
    width: 100%;
    flex: 1;
    font-size: 14pt;
    text-align: center;
}

.Password {
    width: 100%;
    flex: 1;
    font-size: 14pt;
    text-align: center;
}

.PlayerRadioGroup {
    width: 33%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.PlayerLabel {
    flex: 1;
    margin-right: 8px;
    font-weight: bold;
    color: #777777;
    user-select: none;
}

.ShowScoreLabel {
    font-weight: bold;
    color: #777777;
    margin-left: 16px;
    user-select: none;
}

.RoundRadioGroup {
    width: 33%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.RoundLabel {
    flex: 1;
    margin-right: 8px;
    font-weight: bold;
    color: #777777;
    user-select: none;
}

.BtnCancel {
    background-color: #e75b5b;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.BtnCancel:hover {
    background-color: #d15252;
}

.BtnCancel:active {
    background-color: #c44d4d;
}

.BtnCreate {
    background-color: #6884e0;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.BtnCreate:hover {
    background-color: #5e77ca;
}

.BtnCreate:active {
    background-color: #5268b3;
}

.BtnText {
    font-size: 16pt;
    font-weight: bold;
    color: #ffffff;
    user-select: none;
}

/*
 * The following styles are auto-applied to elements with
 * transition="CreateRoomDialog" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the CreateRoomDialog transition by editing
 * these styles.
 */

.CreateRoomDialog-enter-from {
    opacity: 0;
}

.CreateRoomDialog-leave-to {
    opacity: 0;
}

.CreateRoomDialog-enter-from .CreateRoomDialog-Container,
.CreateRoomDialog-leave-to .CreateRoomDialog-Container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>