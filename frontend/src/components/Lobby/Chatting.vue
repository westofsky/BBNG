<template>
    <div class="Chatting RoundBorder">
        <div class="ChattingLog">
            <div class="MessageSet" v-for="messageSet in messages">
                <label class="Nickname">{{messageSet.nickname}}:&nbsp</label>
                <label class="Message">{{messageSet.message}}</label>
            </div>
        </div>
        <input class="ChattingInput" type="input" placeholder="메세지를 입력해주세요..." v-model="inputMessage" v-on:input="applyFilter" v-on:keyup.enter="sendMessage"/>
    </div>
</template>

<script>
    export default {
        name: 'Chatting',
        data() {
            return {
                messages: [

                ],
                inputMessage: '',
            }
        },
        methods: {
            sendMessage() {
                this.messages.push({nickname: 'user', message: this.inputMessage});
                // Implement send message to server logic.
                
                this.inputMessage = "";
                this.scrollToEnd();
            },
            async scrollToEnd() {
                await this.$nextTick();
                var chattingLog = document.querySelector(".ChattingLog");
                var scrollHeight = chattingLog.scrollHeight;
                chattingLog.scrollTop = scrollHeight;
            }
        },
        mounted() {
            this.messages = [
                {nickname: 'Player1', message: 'Hi'},
                {nickname: 'Player2', message: 'Hello'},
                {nickname: 'Player3', message: 'qwer'},
                {nickname: 'Player4', message: '반갑습니다'},
                {nickname: 'Player2', message: 'Hello'},
                {nickname: 'Player3', message: 'qwer'},
                {nickname: 'Player4', message: '반갑습니다'},
                {nickname: 'Player2', message: 'Hello'},
                {nickname: 'Player3', message: 'qwer'},
                {nickname: 'Player4', message: '반갑습니다'},
                {nickname: 'Player2', message: 'Hello'},
                {nickname: 'Player3', message: 'qwer'},
                {nickname: 'Player4', message: '반갑습니다'},
                {nickname: 'Player2', message: 'Hello'},
                {nickname: 'Player3', message: 'qwer'},
                {nickname: 'Player4', message: '반갑습니다'},
                {nickname: 'Player2', message: 'Hello'},
                {nickname: 'Player3', message: 'qwer'},
                {nickname: 'Player4', message: '반갑습니다'},
                {nickname: 'Player2', message: 'Hello'},
                {nickname: 'Player3', message: 'qwer'},
                {nickname: 'Player4', message: '반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다'},
            ];
            this.scrollToEnd();
            // Implement receice chatting message from server logic.
        },
    }
</script>

<style scoped>
.Chatting{
    background-color: #F9F6F6;
    width: 320px;
    height: 384px;
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
}

.ChattingInput {
    font-size: 14pt;
    margin: 0px 8px 8px 8px;
    padding: 4px;
}
</style>