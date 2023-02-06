<template>
    <div class="Log RoundBorder">
        <div class="ChattingLog">
            <div class="MessageSet" v-for="messageSet in Logs" :key="messageSet">
                <label class="Message">{{messageSet.message}}</label>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import * as sock_const from "../../../../common/constant/socket-constants.js";
export default {
    name: 'Log',
    data() {
        return {
            Logs : [],
        }
    },
    props: {
    },
    methods: {
        setLogs(Logs) {
            this.Logs = Logs;
            this.scrollToEnd();
            console.log(this.Logs);
        },
        addLog(message) {
            this.Logs.push({
                message: message
            });
            this.scrollToEnd();
        },
        async scrollToEnd() {
            await this.$nextTick();
            var chattingLog = document.querySelector(".ChattingLog");
            var scrollHeight = chattingLog.scrollHeight;
            // chattingLog.scrollTop = scrollHeight;
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.Log {
    background-color:rgba(0, 0, 0, 0.7);
    width: 280px;
    height: 240px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.RoundBorder {
    border-radius: 8px;
}.ChattingLog {
    flex: 1;
    margin: 8px;
    overflow: auto;
    justify-content: end;
}

.ChattingLog .MessageSet {
    display: flex;
    margin: 0px 0px 4px 0px;
    align-content: center;
}

.ChattingLog .Message {
    flex: 1;
    color : white;
    display: block;
    margin-bottom: 8px;
}
</style>