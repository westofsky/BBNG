<template>
    <div class="Rooms RoundBorder">
        <div class="FilterArea">
            <div class="BtnFilter" v-on:click="btnFilterClicked">
                <label style="font-size: 14pt; font-weight: bold; user-select: none;">필터</label>
            </div>
            <div class="FilterOptionArea">

            </div>
            <div class="BtnRefresh" v-on:click="btnRefreshClicked">
                <img src="../../assets/images/icon_refresh.png" style="width: 40px; height: 40px;" />
            </div>
        </div>
        <div class="RoomList">
            <div class="RoomInfo" v-for="roomInfo in roomList" v-on:click="onRoomClicked(roomInfo)">
                <div class="RoomInfo1">
                    <img v-if="roomInfo.roomopt_lock" class="Lock" src="../../assets/images/icon_lock.png"/>
                    <label class="Name">{{roomInfo.room_name}}</label>
                    <label class="Player">{{roomInfo.room_current_player}} / {{roomInfo.roomopt_max_player}}</label>
                </div>
                <div class="RoomInfo2">
                    <label class="Round">{{roomInfo.roomopt_round}} 라운드</label>
                    <label v-if="roomInfo.roomopt_show_score" class="ShowScore">점수표시</label>
                    <label v-if="roomInfo.room_state === '대기중'" class="Waiting">{{roomInfo.room_state}}</label>
                    <label v-else-if="roomInfo.room_state === '진행중'" class="Playing">{{roomInfo.room_state}}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rooms',
    data() {
        return {
            roomList: [
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
            ]
        }
    },
    methods: {
        setRooms(roomList) {
            this.roomList = roomList;
        },
        btnFilterClicked(){

        },
        btnRefreshClicked() {

        },
        onRoomClicked(roomInfo) {
            if(roomInfo.room_state == "진행중") {
                alert("이미 게임이 진행중인 방입니다!");
            }
        },
    },
}
</script>

<style scoped>
.Rooms {
    background-color: #F9F6F6;
    width: 640px;
    height: 720px;
    margin-left: 32px;
    margin-right: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.RoundBorder {
    border-radius: 8px;
}

.FilterArea {
    box-sizing: border-box;
    width: 622px;
    height: 40px;
    margin: 8px;
    display: flex;
}

.RoomList {
    width: 622px;
    flex: 1;
    margin: 0px 8px 8px 8px;
    overflow: auto;
}

.BtnFilter {
    width: 100px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.BtnFilter:hover {
    background-color: #d8d8d8;
}

.BtnFilter:active {
    background-color: #acacac;
}

.FilterOptionArea {
    flex: 1;
    background-color: #888888;
    margin: 0px 8px;
}

.BtnRefresh {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: #A8A8A8;
}

.BtnRefresh:hover {
    background-color: #8f8f8f;
}

.BtnRefresh:active {
    background-color: #727272;
}

.RoomInfo {
    background-color: #ffffff;
    padding: 8px;
    display: flex;
    border-radius: 8px;
    margin: 8px 0px;
    flex-direction: column;
}

.RoomInfo:hover {
    background-color: #e7e7e7;
}

.RoomInfo:active {
    background-color: #c7c7c7;
}

.RoomInfo1 {
    flex: 1;
    display: flex;
    align-items: center;
}

.RoomInfo1 .Lock {
    width: 32px;
    height: 32px;
}

.RoomInfo1 .Name {
    flex: 1;
    font-weight: bold;
    font-size: 16pt;
    user-select: none;
}

.RoomInfo1 .Player {
    font-weight: bold;
    font-size: 14pt;
    user-select: none;
}

.RoomInfo2 {
    flex: 1;
    margin-top: 8px;
    align-items: center;
}

.RoomInfo .Round {
    display: inline-block;
    background-color: #6675FF;
    font-weight: bold;
    font-size: 12pt;
    user-select: none;
    color: #ffffff;
    border-radius: 8px;
    padding: 4px;
    margin-right: 8px;
}

.RoomInfo2 .ShowScore {
    display: inline-block;
    background-color: #FF6A6A;
    font-weight: bold;
    font-size: 12pt;
    user-select: none;
    color: #ffffff;
    border-radius: 8px;
    padding: 4px;
    margin-right: 8px;
}
.RoomInfo2 .Waiting {
    color: #4EF05E;
    font-weight: bold;
    font-size: 14pt;
    user-select: none;
    float:right;
}
.RoomInfo2 .Playing {
    color: #f13131;
    font-weight: bold;
    font-size: 14pt;
    user-select: none;
    float:right;
}
</style>