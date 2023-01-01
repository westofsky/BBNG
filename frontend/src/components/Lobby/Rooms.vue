<template>
    <div class="Rooms RoundBorder">
        <div class="FilterArea">
            <div class="FilterOptionArea">
                <div class="PasswordRequired">
                    <select name="FilterPasswordRequired" style="font-size: 14pt">
                        <option value="all">전체</option>
                        <option value="required">필요</option>
                        <option value="not_required">불필요</option>
                    </select>
                </div>
                <div class="Round">
                    <select name="FilterRound" style="font-size: 14pt">
                        <option value="all">전체</option>
                        <option value="round_10">10 라운드</option>
                        <option value="round_15">15 라운드</option>
                        <option value="round_20">20 라운드</option>
                    </select>
                </div>
                <div class="ShowScore">
                    <select name="FilterShowScore" style="font-size: 14pt">
                        <option value="all">전체</option>
                        <option value="show">표시</option>
                        <option value="not_show">미표시</option>
                    </select>
                </div>
                <input class="SearchInput" type="search" placeholder="검색할 방 이름 입력"/>
                <div class="BtnSearch">
                    <img src="../../assets/images/icon_search.png" style="width: 32px; height: 32px;"/>
                </div>
            </div>
            <div class="BtnRefresh" v-on:click="btnRefreshClicked">
                <img src="../../assets/images/icon_refresh.png" style="width: 32px; height: 32px;" />
            </div>
        </div>
        <div class="RoomList">
            <div :class="roomInfo.room_state === '대기중'? 'RoomInfo Enable':'RoomInfo Disable'" v-for="roomInfo in roomList" v-on:click="onRoomClicked(roomInfo)">
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
.FilterOptionArea {
    flex: 1;
    margin-right: 8px;
    display: flex;
    align-items: center;
}

.FilterOptionArea .PasswordRequired {
    margin-right: 8px;
}

.FilterOptionArea .Round {
    margin-right: 8px;
}

.FilterOptionArea .ShowScore {
    margin-right: 8px;
}

.FilterOptionArea .SearchInput {
    flex: 1;
    font-size: 14pt;
}

.FilterOptionArea .BtnSearch {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: #A8A8A8;
    box-shadow: 2px 1px rgb(209, 209, 209);
    display: flex;
    justify-content: center;
    align-items: center;
}
.FilterOptionArea .BtnSearch:hover {
    background-color: #8f8f8f;
}
.FilterOptionArea .BtnSearch:active {
    background-color: #727272;
}

.BtnRefresh {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: #A8A8A8;
    box-shadow: 2px 2px rgb(209, 209, 209);
    display: flex;
    justify-content: center;
    align-items: center;
}

.BtnRefresh:hover {
    background-color: #8f8f8f;
}

.BtnRefresh:active {
    background-color: #727272;
}

.RoomInfo {
    padding: 8px;
    display: flexbox;
    border-radius: 8px;
    margin: 8px 8px 0px 4px;
    flex-direction: column;
}

.Enable{
    background-color: #ffffff;
    box-shadow: 2px 2px rgb(209, 209, 209);
}

.Disable{
    user-select: none;
    pointer-events: none;
    background-color: #888888;
    box-shadow: 2px 2px rgb(70, 70, 70);
    opacity: 0.7;
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
    color: #a11414;
    font-weight: bold;
    font-size: 14pt;
    user-select: none;
    float:right;
}
</style>