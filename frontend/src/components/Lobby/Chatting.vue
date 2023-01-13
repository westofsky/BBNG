<template>
    <div class="Chatting RoundBorder">
        <div class="ChattingLog">
            <div class="MessageSet" v-for="messageSet in messages" :key="messageSet">
                <label class="Nickname" v-if="messageSet.state == 0">{{ messageSet.nickname }}:&nbsp</label>
                <label class="Message" style="text-align : right" v-if="messageSet.state == 1">{{
                    messageSet.message
                }}</label>
                <label class="Message" v-else>{{ messageSet.message }}</label>
            </div>
        </div>
        <input class="ChattingInput" type="input" placeholder="메세지를 입력해주세요..." v-model="inputMessage"
            v-on:input="applyFilter" v-on:keyup.enter="sendMessage" />
    </div>
</template>

<script>
import io from 'socket.io-client';
import * as sock_const from "../../../../common/constant/socket-constants.js";

export default {
    name: 'Chatting',
    data() {
        return {
            messages: [

            ],
            inputMessage: '',
            chattingDelayTimer: null,
            chattingDelayTime: 0,
        }
    },
    props: {
        socket: { type: io.Socket, required: true },
    },
    methods: {
        addMessageToList(user, message, state) {
            this.messages.push({ nickname: user, message: message, state: state });
            this.scrollToEnd();
        },
        setMessages(messages) {
            this.messages = messages;
            this.scrollToEnd();
        },
        sendMessage() {
            if (this.inputMessage.length == 0 || this.chattingDelayTime != 0) return;

            // Implement send message to server logic.
            this.socket.emit(sock_const.RequestType.SEND_MSG_TO_LOBBY, { user: this.$store.getters["Users/getUser_nickname"], message: this.inputMessage });
            this.addMessageToList(this.$store.getters["Users/getUser_nickname"], this.inputMessage, 1);
            this.inputMessage = "";

            var inputBox = document.querySelector(".ChattingInput");
            inputBox.disabled = true;
            this.chattingDelayTime = 3;
            inputBox.placeholder = this.chattingDelayTime + "초 후에 전송 가능";

            this.chattingDelayTimer = setInterval(() => {
                this.chattingDelayTime -= 1;
                if (this.chattingDelayTime == 0) {
                    inputBox.disabled = false;
                    inputBox.placeholder = "메세지를 입력해주세요...";
                    clearInterval(this.chattingDelayTimer);
                } else {
                    inputBox.placeholder = this.chattingDelayTime + "초 후에 전송 가능";
                }
            }, 1000);
        },
        async scrollToEnd() {
            await this.$nextTick();
            var chattingLog = document.querySelector(".ChattingLog");
            var scrollHeight = chattingLog.scrollHeight;
            chattingLog.scrollTop = scrollHeight;
        }
    },
    mounted() {
        // Implement receive chatting message from server logic.
        this.socket.emit(sock_const.RequestType.JOIN_LOBBY, { user: this.$store.getters["Users/getUser_oid"] });
        console.log(sock_const.ResponseType.BROADCAST_LOBBY_MSG);
        this.socket.on(sock_const.ResponseType.BROADCAST_LOBBY_MSG, (data) => {
            this.addMessageToList(data.user, data.message, 0);
        });
    },
}
</script>

<style scoped>
.Chatting {
    background-color: #F9F6F6;
    width: 320px;
    height: 340px;
    display: flex;
    flex-direction: column;
}

.RoundBorder {
    border-radius: 8px;
}

.ChattingLog {
    flex: 1;
    background-color: #F9F6F6;
    margin: 8px;
    overflow: auto;
    justify-content: end;
}

.ChattingLog .MessageSet {
    display: flex;
    margin: 0px 0px 4px 0px;
    align-content: center;
}

.ChattingLog .Nickname {
    color: #000000;
    font-size: 12pt;
    font-weight: bold;
}

.ChattingLog .Message {
    flex: 1;
    display: block;
}

.ChattingInput {
    font-size: 14pt;
    margin: 0px 8px 8px 8px;
    padding: 4px;
}
</style>