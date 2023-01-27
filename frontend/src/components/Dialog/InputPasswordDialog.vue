<template>
    <Transition name="InputPasswordDialog">
        <div v-if="show" class="InputPasswordDialog-Mask" @keyup.esc="$emit('close')" tabindex="0">
            <div class="InputPasswordDialog-Wrapper">
                <div class="InputPasswordDialog-Container">
                    <div class="InputPasswordDialog-Header">
                        <label class="InputPasswordDialog-Title">방 비밀번호 입력</label>
                    </div>
                    <div class="InputPasswordDialog-Body">
                        <input class="Password" type="password" v-model="password" />
                    </div>

                    <div class="InputPasswordDialog-Footer">
                        <div class="BtnCancel" @click="$emit('close')">
                            <label class="BtnText">취소</label>
                        </div>
                        <button v-bind:disabled="password.length == 0" class="BtnJoin BtnText"
                            @click="joinRoom">참여</button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import io from 'socket.io-client';
import * as sock_const from "../../../../common/constant/socket-constants.js";
import * as game_const from "../../../../common/constant/game-constants.js";

export default {
    name: 'InputPasswordDialog',
    data() {
        return {
            rid: '',
            password: '',
        }
    },
    props: {
        show: Boolean,
    },
    methods: {
        mounted() {
        },
        init(rid) {
            this.rid = rid;
            this.password = '';
        },
        joinRoom() {
            this.$emit('close');
            this.$socket.value.emit(sock_const.RequestType.JOIN_ROOM, {
                rid: this.rid,
                socket_id: this.$socket.value.id,
                oid: this.$store.getters["Users/getUser_oid"],
                nickname: this.$store.getters["Users/getUser_nickname"],
                password: this.password
            });
        }
    }
}
</script>

<style scoped>
.InputPasswordDialog-Mask {
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

.InputPasswordDialog-Wrapper {
    display: table-cell;
    vertical-align: middle;
}

.InputPasswordDialog-Container {
    width: 320px;
    margin: 0px auto;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
    display: inline-block;
}

.InputPasswordDialog-Header {
    height: 48px;
    display: flex;
    justify-content: center;
    background-color: rgb(70, 199, 135);
}

.InputPasswordDialog-Title {
    font-size: 18pt;
    font-weight: bold;
    padding: 8px;
    color: #ffffff;
    user-select: none;
}

.InputPasswordDialog-Body {
    display: flex;
    flex-direction: column;
    padding: 16px 0px;
}

.InputPasswordDialog-Footer {
    height: 48px;
    background-color: #525252;
    display: flex;
    flex-direction: row;
}

.Password {
    flex: 1;
    font-size: 16pt;
    text-align: center;
    margin: 0px 32px;
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

.BtnJoin {
    background-color: #6884e0;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0px;
}

.BtnJoin:hover:enabled {
    background-color: #5e77ca;
}

.BtnJoin:active:enabled {
    background-color: #5268b3;
}

.BtnJoin:disabled {
    background-color: #374677;
}

.BtnText {
    font-size: 16pt;
    font-weight: bold;
    color: #ffffff;
    user-select: none;
}

.BtnText:disabled {
    color: #777777;
}

/*
 * The following styles are auto-applied to elements with
 * transition="InputPasswordDialog" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the InputPasswordDialog transition by editing
 * these styles.
 */

.InputPasswordDialog-enter-from {
    opacity: 0;
}

.InputPasswordDialog-leave-to {
    opacity: 0;
}

.InputPasswordDialog-enter-from .InputPasswordDialog-Container,
.InputPasswordDialog-leave-to .InputPasswordDialog-Container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>