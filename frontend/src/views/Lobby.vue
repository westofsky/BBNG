<template>
    <div class="Lobby">
        <div class="Ranking">
            <Ranking ref="RankingComponent" />
        </div>
        <div>
            
            <div class="Rooms">
                <Rooms />
            </div>
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
            <div class="Friends">
                <Friends />
            </div>
            <div class="Chatting">
                <Chatting />
            </div>
        </div>
    </div>
</template>

<script>
import Ranking from '../components/Lobby/Ranking.vue';
import Rooms from '../components/Lobby/Rooms.vue';
import Friends from '../components/Lobby/Friends.vue';
import Chatting from '../components/Lobby/Chatting.vue';

export default {
    name: 'Lobby',
    data() {

    },
    methods: {
        btnQuickMatchClicked() {
            
        },
        btnRankMatchClicked() {

        },
        btnCreateRoomClicked() {

        },
        btnRuleClicked() {

        }
    },
    components: {
        Ranking: Ranking,
        Rooms: Rooms,
        Friends: Friends,
        Chatting: Chatting,
    },
    created() {

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
.RuleArea{
    margin-left: 32px;
    margin-right: 32px;
    margin-bottom: 32px;
    width: 640px;
    height: 48px;
    display: flex;
}
.BtnRule{
    background-color: #6b5637;
    width: 180px;
    height: 48px;
    margin-left : auto;
    margin-top : 20px;
    box-sizing: border-box;
}
.BtnRule:hover{
    background-color : #4e3f29;
}
.BtnRule:active{
    background-color : #362b1c;
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
    cursor:pointer;
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
</style>