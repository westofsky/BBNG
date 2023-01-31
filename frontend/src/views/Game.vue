<template>
    <div class="Game">
        <div class = "logs">
            <Log ref="LogComponent" />
            <Chatting ref="ChattingComponent" style="width:280px"/>
        </div>
        <div class = "game_zone">
            <div class="game_table">
                <!-- 여기 안에 다른 card들 component들어가야함-->    
            </div>
            <div class = "nickname_mine">
                <p>player1</p>
            </div>
            <div class ="card_mine">
                
            </div>
            
        </div>
        <div class = "menu">
        </div>
    </div>
</template>
  
<script>
import Log from '../components/Game/Log.vue';
import Chatting from '../components/Lobby/Chatting.vue';
export default {
    name: 'Game',
    components: {
        Log : Log,
        Chatting : Chatting,
    },
    data(){
        return {
            rid : '',
        }
    },
    methods : {
        
    },
    mounted(){
        this.rid = this.$store.getters["Games/getGame_rid"];
        let chattingList = [
            { nickname: 'Player1', message: '인게임' },
            { nickname: 'Player2', message: '메세지테스트' },
        ];
        let LogList = [
            { message: '인게임' },
            { message: '메세지테스트' },
        ];
        this.$refs.LogComponent.setLogs(LogList);
        this.$refs.ChattingComponent.setMessages(chattingList);
    }
}
</script>
<style scoped>
.Game {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E1D5D5;
}
.logs{
    padding-left:10px;
    padding-right: 10px;
}
.game_zone{
    width:70%;
    height:100%;
    
}

.menu{
    width:10%;
    height:100%;
    
}
</style>
  