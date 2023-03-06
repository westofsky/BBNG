<template>
    <div class="Chatting RoundBorder">
        <div class="ChattingLog">
            <div class="MessageSet" v-for="messageSet in messages" :key="messageSet">
                <label class="Nickname">{{ messageSet.nickname }}:&nbsp</label>
                <label class="Message">{{ messageSet.message }}</label>
                <!-- <label class="Nickname" v-if="messageSet.state == 0">{{ messageSet.nickname }}:&nbsp</label>
                <label class="Message" style="text-align : right" v-if="messageSet.state == 1">{{
                    messageSet.message
                }}</label>
                <label class="Message" v-else>{{ messageSet.message }}</label> -->
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
            currentDelayTime: 0,
        }
    },
    props: {
        chattingDelayTime: {
            type: Number,
            required: true
        },
        requestType: {
            type: Number,
            required: true
        },
        responseType: {
            type: Number,
            required: true
        },
        rid: {
            type: String,
            default: '',
            required: false
        },
    },
    methods: {
        addMessageToList(nickname, message, state) {
            this.messages.push({ nickname: nickname, message: message, state: state });
            this.scrollToEnd();
        },
        setMessages(messages) {
            this.messages = messages;
            this.scrollToEnd();
        },
        sendMessage() {
            if (this.inputMessage.length == 0 || this.currentDelayTime != 0) return;

            // Implement send message to server logic.
            this.$socket.value.emit(this.requestType, { rid: this.rid, nickname: this.$store.getters["Users/getUser_nickname"], message: this.inputMessage });
            this.addMessageToList(this.$store.getters["Users/getUser_nickname"], this.inputMessage, 1);
            this.inputMessage = "";

            if (this.chattingDelayTime != 0) {
                var inputBox = document.querySelector(".ChattingInput");
                inputBox.disabled = true;
                this.currentDelayTime = this.chattingDelayTime;
                inputBox.placeholder = this.currentDelayTime + "초 후에 전송 가능";
                this.chattingDelayTimer = setInterval(() => {
                    this.currentDelayTime -= 1;
                    if (this.currentDelayTime == 0) {
                        inputBox.disabled = false;
                        inputBox.placeholder = "메세지를 입력해주세요...";
                        clearInterval(this.chattingDelayTimer);
                    } else {
                        inputBox.placeholder = this.currentDelayTime + "초 후에 전송 가능";
                    }
                }, 1000);
            }
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
        this.$socket.value.on(this.responseType, (data) => {
            this.addMessageToList(data.nickname, data.message, 0);
        });
    },
}
</script>

<style scoped>
.Chatting {
    background-color: #F9F6F6;
    width: 100%;
    padding-bottom : 80%;
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