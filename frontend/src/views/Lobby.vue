<template>
    <div class="Lobby">
        <Ranking ref="RankingComponent" />
        <div>
            <Rooms ref="RoomComponent" />
            <div class="BtnArea">
                <div class="Btn BtnQuickMatch RoundBorder" @click="btnQuickMatchClicked">
                    <label class="BtnText" style="user-select: none; flex: 1;">빠른매칭</label>
                </div>
                <div class="Btn BtnRankMatch RoundBorder" @click="btnRankMatchClicked">
                    <label class="BtnText" style="user-select: none; flex: 1;">랭크매칭</label>
                </div>
                <div class="Btn BtnCreateRoom RoundBorder" @click="btnCreateRoomClicked">
                    <label class="BtnText" style="user-select: none; flex: 1;">방 만들기</label>
                </div>
            </div>
        </div>
        <div>
            <Friends ref="FriendsComponent" />
            <Chatting ref="ChattingComponent" />
        </div>
        <div class="popup_rules" v-if="isRuleActive">
            <Rules @event-isRules="setIsRuleActive" />
        </div>
        <div class="popup_rules" v-if="isRuleActive">
            <Rules @event-isRules="setIsRuleActive" />
        </div>
    </div>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <CreateRoomDialog :show="showCreateRoomDialog" @close="showCreateRoomDialog = false">
            <template #header>
                <h3>custom1 header</h3>
            </template>
        </CreateRoomDialog>
    </Teleport>
</template>

<script>
import Ranking from '../components/Lobby/Ranking.vue';
import Rooms from '../components/Lobby/Rooms.vue';
import Friends from '../components/Lobby/Friends.vue';
import Chatting from '../components/Lobby/Chatting.vue';
import Rules from '../components/Lobby/Rules.vue';
import CreateRoomDialog from '../components/Lobby/CreateRoomDialog.vue'

export default {
    name: 'Lobby',
    data() {
        return {
            isRuleActive: false,
            showCreateRoomDialog: false,
        }
    },
    methods: {
        btnQuickMatchClicked() {
            this.isRuleActive = true;
        },
        btnRankMatchClicked() {
            this.showCreateRoomDialog = true;
        },
        btnCreateRoomClicked() {

        },
        btnRuleClicked() {
        },
        setIsRuleActive() {
            this.isRuleActive = false;
        }
    },
    components: {
        Ranking: Ranking,
        Rooms: Rooms,
        Friends: Friends,
        Chatting: Chatting,
        Rules: Rules,
        CreateRoomDialog: CreateRoomDialog,
    },
    mounted() {
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
        let roomList = [
            {
                room_name: "Player1의 방",
                room_state: "대기중",
                room_current_player: 2,
                roomopt_round: 15,
                roomopt_show_score: true,
                roomopt_max_player: 5,
                roomopt_lock: true
            },
            {
                room_name: "초보만",
                room_state: "대기중",
                room_current_player: 1,
                roomopt_round: 10,
                roomopt_show_score: false,
                roomopt_max_player: 4,
                roomopt_lock: false
            },
            {
                room_name: "고수만 초보 사절",
                room_state: "대기중",
                room_current_player: 2,
                roomopt_round: 20,
                roomopt_show_score: true,
                roomopt_max_player: 4,
                roomopt_lock: false
            },
            {
                room_name: "qwer1234",
                room_state: "대기중",
                room_current_player: 3,
                roomopt_round: 15,
                roomopt_show_score: true,
                roomopt_max_player: 3,
                roomopt_lock: true
            },
            {
                room_name: "초보만",
                room_state: "진행중",
                room_current_player: 3,
                roomopt_round: 15,
                roomopt_show_score: true,
                roomopt_max_player: 3,
                roomopt_lock: true
            },
            {
                room_name: "초보만",
                room_state: "진행중",
                room_current_player: 3,
                roomopt_round: 15,
                roomopt_show_score: true,
                roomopt_max_player: 3,
                roomopt_lock: true
            },
            {
                room_name: "초보만",
                room_state: "진행중",
                room_current_player: 3,
                roomopt_round: 15,
                roomopt_show_score: true,
                roomopt_max_player: 3,
                roomopt_lock: true
            },
            {
                room_name: "초보만",
                room_state: "진행중",
                room_current_player: 3,
                roomopt_round: 15,
                roomopt_show_score: true,
                roomopt_max_player: 3,
                roomopt_lock: true
            },
            {
                room_name: "초보만",
                room_state: "진행중",
                room_current_player: 3,
                roomopt_round: 15,
                roomopt_show_score: true,
                roomopt_max_player: 3,
                roomopt_lock: true
            },
        ];
        let friendList = [
            { nickname: "Player1", state: "online" },
            { nickname: "손영진", state: "online" },
            { nickname: "배성준", state: "offline" },
            { nickname: "손영진", state: "online" },
            { nickname: "Player2", state: "online" },
            { nickname: "Player3", state: "online" },
            { nickname: "Player4", state: "online" },
            { nickname: "Player5", state: "online" },
            { nickname: "Player6", state: "online" },
            { nickname: "Player7", state: "online" },
        ];
        let chattingList = [
            { nickname: 'Player1', message: 'Hi' },
            { nickname: 'Player2', message: 'Hello' },
            { nickname: 'Player3', message: 'qwer' },
            { nickname: 'Player4', message: '반갑습니다' },
            { nickname: 'Player2', message: 'Hello' },
            { nickname: 'Player3', message: 'qwer' },
            { nickname: 'Player4', message: '반갑습니다' },
            { nickname: 'Player2', message: 'Hello' },
            { nickname: 'Player3', message: 'qwer' },
            { nickname: 'Player4', message: '반갑습니다' },
            { nickname: 'Player2', message: 'Hello' },
            { nickname: 'Player3', message: 'qwer' },
            { nickname: 'Player4', message: '반갑습니다' },
            { nickname: 'Player2', message: 'Hello' },
            { nickname: 'Player3', message: 'qwer' },
            { nickname: 'Player4', message: '반갑습니다' },
            { nickname: 'Player2', message: 'Hello' },
            { nickname: 'Player3', message: 'qwer' },
            { nickname: 'Player4', message: '반갑습니다' },
            { nickname: 'Player2', message: 'Hello' },
            { nickname: 'Player3', message: 'qwer' },
            { nickname: 'Player4', message: '반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다' },
        ];
        this.$refs.RankingComponent.setRanking(rankList);
        this.$refs.RoomComponent.setRooms(roomList);
        this.$refs.FriendsComponent.setFriends(friendList);
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

.RoundBorder {
    border-radius: 8px;
}

.RuleArea {
    margin-left: 32px;
    margin-right: 32px;
    margin-bottom: 32px;
    width: 640px;
    height: 48px;
    display: flex;
}

.BtnRule {
    background-color: #6b5637;
    width: 180px;
    height: 48px;
    margin-left: auto;
    margin-top: 20px;
    box-sizing: border-box;
}

.BtnRule:hover {
    background-color: #4e3f29;
}

.BtnRule:active {
    background-color: #362b1c;
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
}

.BtnCreateRoom:hover {
    background-color: #8d7248;
}

.BtnCreateRoom:active {
    background-color: #79623e;
}


.Friends {
    width: 320px;
    height: 384px;
    margin-bottom: 32px;
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