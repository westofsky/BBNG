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
                <div class="BtnQuickMatch RoundBorder" @click="run"> </div>
                <div class="BtnRankMatch RoundBorder"> </div>
                <div class="BtnCreateRoom RoundBorder"> </div>
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
import Ranking from '../components/Ranking.vue';
import Rooms from '../components/Rooms.vue';
import Friends from '../components/Friends.vue';
import Chatting from '../components/Chatting.vue';

export default {
    name: 'Lobby',
    data() {

    },
    methods: {
        run() {
            this.$refs.RankingComponent.setRanking([{ tier: "Challenger", nick: "Nickname1", rank_point: 99999 },
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
            { tier: "Challenger", nick: "Nickname21", rank_point: 99999 },]);
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

.Ranking {
    width: 320px;
    height: 800px;
}

.Rooms {
    width: 640px;
    height: 720px;
}

.BtnArea {
    margin-left: 32px;
    margin-right: 32px;
    margin-top: 32px;
    width: 640px;
    height: 48px;
    display: flex;
}

.BtnQuickMatch {
    background-color: #524311;
    width: 180px;
    height: 48px;
    flex: 1;
    box-sizing: border-box;
}

.BtnRankMatch {
    background-color: #515111;
    width: 180px;
    height: 48px;
    margin: 0px 50px;
    flex: 1;
    box-sizing: border-box;
}

.BtnCreateRoom {
    background-color: #553331;
    width: 180px;
    height: 48px;
    float: left;
    box-sizing: border-box;
}

.Friends {
    width: 320px;
    height: 384px;
    margin-bottom: 32px;
}

.Chatting {
    width: 320px;
    height: 384px;
}
</style>