<template>
    <div class="Lobby">
        <Ranking ref="RankingComponent" />
        <div>
            <div class="RoomListHeader">
                <div class="Btn BtnRule RoundBorder" @click="btnRuleClicked">
                    <label class="BtnText" style="user-select: none; flex: 1;">How to Play?</label>
                </div>
            </div>
            <Rooms ref="RoomComponent" />
            <div class="BtnArea">
                <div class="Btn BtnQuickMatch RoundBorder" @click="btnQuickMatchClicked">
                    <label class="BtnText" style="user-select: none; flex: 1;">빠른매칭</label>
                </div>
                <div class="Btn BtnRankMatch RoundBorder" @click="Logout">
                    <label class="BtnText" style="user-select: none; flex: 1;">랭크매칭</label>
                </div>
                <div class="Btn BtnCreateRoom RoundBorder" @click="btnCreateRoomClicked">
                    <label class="BtnText" style="user-select: none; flex: 1;">방 만들기</label>
                </div>
            </div>
        </div>
        <div>
            <div class="UserInfo">
                <img class="AccountImage" src="../assets/images/icon_account.png" />
                <label class="UserName">{{ nickname }}</label>
            </div>
            <Friends ref="FriendsComponent" />
            <Chatting ref="ChattingComponent" :request-type="chatRequestType" :response-type="chatResponseType"
                :chatting-delay-time="3" />
        </div>
        <div class="popup_rules" v-if="isRuleActive">
            <Rules @event-isRules="setIsRuleActive" />
        </div>
    </div>
</template> 

<script>
import Ranking from '../components/Lobby/Ranking.vue';
import Rooms from '../components/Lobby/Rooms.vue';
import Friends from '../components/Lobby/Friends.vue';
import Chatting from '../components/Lobby/Chatting.vue';
import Rules from '../components/Lobby/Rules.vue';
import io from 'socket.io-client';
import * as sock_const from "../../../common/constant/socket-constants";

export default {
    name: 'Lobby',

    data() {
        return {
            isRuleActive: false,
            nickname: '',
            chatRequestType: sock_const.RequestType.SEND_MSG_TO_LOBBY,
            chatResponseType: sock_const.ResponseType.BROADCAST_LOBBY_MSG,
        }
    },
    methods: {
        btnRuleClicked() {
            this.isRuleActive = true;
        },
        btnQuickMatchClicked() {
        },
        btnRankMatchClicked() {
        },
        btnCreateRoomClicked() {
            this.$refs.RoomComponent.createRoom();
        },
        setIsRuleActive() {
            this.isRuleActive = false;
        },
        logout() {
            this.$socket.value.disconnect();
            this.$store.commit("Users/setUser_oid", '');
            this.$store.commit("Users/setUser_nickname", '');
            this.$router.push({ name: 'Home' });
        }
    },
    components: {
        Ranking: Ranking,
        Rooms: Rooms,
        Friends: Friends,
        Chatting: Chatting,
        Rules: Rules,
    },
    mounted() {
        this.nickname = this.$store.getters["Users/getUser_nickname"];

        this.$socket.value.on(sock_const.ResponseType.RES_JOIN_LOBBY, () => {
            this.$refs.RoomComponent.refreshData();
            this.$refs.FriendsComponent.refreshData();
        });
        this.$socket.value.emit(sock_const.RequestType.JOIN_LOBBY);

        // Implement load initial datas from server.
        let rankList = [{ tier: "Challenger", nick: "Nickname1", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname2", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname3", rank_point: 33333 },
        { tier: "Challenger", nick: "Nickname3", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname4", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname5", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname6", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname7", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname8", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname9", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname10", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname11", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname12", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname13", rank_point: 33333 },
        { tier: "Challenger", nick: "Nickname13", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname14", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname15", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname16", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname17", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname18", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname19", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname20", rank_point: 99999 },
        { tier: "Challenger", nick: "Nickname21", rank_point: 99999 }];
        let chattingList = [
            { nickname: 'Player1', message: 'Hi' },
            { nickname: 'Player2', message: 'Hello' },
        ];
        this.$refs.RankingComponent.setRanking(rankList);
        this.$refs.ChattingComponent.setMessages(chattingList);
    },
}
</script>

<style scoped>
.Lobby {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E1D5D5;
}

.UserInfo {
    height: 48px;
    width: 320px;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
}

.AccountImage {
    user-select: none;
    width: 32px;
    height: 32px;
}

.UserName {
    margin: 8px;
    font-size: 14pt;
    color: #727272;
    font-weight: bold;
}

.RoundBorder {
    border-radius: 8px;
}

.RoomListHeader {
    width: 640px;
    height: 48px;
    margin-left: 32px;
    margin-right: 32px;
    margin-bottom: 32px;
    flex-direction: row;
    display: flex;
}

.BtnRule {
    background-color: #34e243;
    width: 180px;
    height: 48px;
    flex: 1;
    box-sizing: border-box;
    box-shadow: 2px 2px rgb(197, 197, 197);
}

.BtnRule:hover {
    background-color: #2dc53a;
}

.BtnRule:active {
    background-color: #23992d;
}

.BtnArea {
    margin-left: 32px;
    margin-right: 32px;
    margin-top: 32px;
    width: 640px;
    height: 48px;
    display: flex;
}

.Btn {
    display: flex;
}

.BtnText {
    color: #ffffff;
    font-weight: bold;
    font-size: 16pt;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
}

.BtnQuickMatch {
    background-color: #4677c1;
    width: 180px;
    height: 48px;
    flex: 1;
    box-sizing: border-box;
    box-shadow: 2px 2px rgb(197, 197, 197);
}

.BtnQuickMatch:hover {
    background-color: #3e69aa;
}

.BtnQuickMatch:active {
    background-color: #32568b;
}

.BtnRankMatch {
    background-color: #334662;
    width: 180px;
    height: 48px;
    margin: 0px 50px;
    flex: 1;
    box-sizing: border-box;
    box-shadow: 2px 2px rgb(197, 197, 197);
}

.BtnRankMatch:hover {
    background-color: #2b3b52;
}

.BtnRankMatch:active {
    background-color: #243146;
}

.BtnCreateRoom {
    background-color: #9b7d50;
    width: 180px;
    height: 48px;
    float: left;
    box-sizing: border-box;
    box-shadow: 2px 2px rgb(197, 197, 197);
}

.BtnCreateRoom:hover {
    background-color: #8d7248;
}

.BtnCreateRoom:active {
    background-color: #79623e;
}

.popup_rules {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
}
</style>