<template>
    <div class="Lobby">
        <div class="Ranking">
            <Ranking/> 
        </div>
        <div>
            <div class="Rooms">
                <Rooms/> 
            </div>
            <div class="BtnArea">
                <div class="BtnQuickMatch RoundBorder"> </div>
                <div class="BtnRankMatch RoundBorder"> </div>
                <div class="BtnCreateRoom RoundBorder"> </div>
            </div>
        </div>
        <div>
            <div class="Friends">
                <Friends/> 
            </div>
            <div class="Chatting">
                <Chatting/> 
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
    data(){

    },
    methods:{

    },
    components: {
        Ranking: Ranking,
        Rooms: Rooms,
        Friends: Friends,
        Chatting: Chatting,
    }
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

.BtnArea{
    margin-left: 32px;
    margin-right: 32px;
    margin-top: 32px;
    width: 640px;
    height: 48px;
    display: flex;
}

.BtnQuickMatch{
    background-color: #524311;
    width: 180px;
    height: 48px;
    flex: 1;
    box-sizing: border-box;
}

.BtnRankMatch{
    background-color: #515111;
    width: 180px;
    height: 48px;
    margin: 0px 50px;
    flex: 1;
    box-sizing: border-box;
}

.BtnCreateRoom{
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