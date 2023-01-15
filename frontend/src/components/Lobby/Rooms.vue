<template>
    <div class="Rooms RoundBorder">
        <div class="FilterArea">
            <div class="FilterOptionArea">
                <div class="PasswordRequired">
                    <select v-model="filterPasswordRequired" style="font-size: 14pt" @change="applyFilter">
                        <option value="all">전체</option>
                        <option value="required">필요</option>
                        <option value="not_required">불필요</option>
                    </select>
                </div>
                <div class="Round">
                    <select v-model="filterRound" name="FilterRound" style="font-size: 14pt" @change="applyFilter">
                        <option value="all">전체</option>
                        <option value=10>10 라운드</option>
                        <option value=15>15 라운드</option>
                        <option value=20>20 라운드</option>
                    </select>
                </div>
                <div class="ShowScore">
                    <select v-model="filterShowScore" name="FilterShowScore" style="font-size: 14pt"
                        @change="applyFilter">
                        <option value="all">전체</option>
                        <option value="show">표시</option>
                        <option value="not_show">미표시</option>
                    </select>
                </div>
                <input class="SearchInput" type="search" placeholder="검색할 방 이름 입력" v-model="filterName"
                    v-on:input="applyFilter" />
            </div>
            <div class="BtnRefresh" v-on:click="btnRefreshClicked">
                <img src="../../assets/images/icon_refresh.png" style="width: 32px; height: 32px;" />
            </div>
        </div>
        <div class="RoomList">
            <div :class="roomInfo.state === 0 ? 'RoomInfo Enable' : 'RoomInfo Disable'"
                v-for="roomInfo in filteredRoomList" :key="roomInfo.rid" v-on:click="onRoomClicked(roomInfo)">
                <div class="RoomInfo1">
                    <img v-if="roomInfo.password_required" class="Lock" src="../../assets/images/icon_lock.png" />
                    <label class="Name">{{ roomInfo.name }}</label>
                    <label class="Player">{{ roomInfo.current_player_count }} / {{ roomInfo.player_limit }}</label>
                </div>
                <div class="RoomInfo2">
                    <label class="Round">{{ roomInfo.round_count }} 라운드</label>
                    <label v-if="roomInfo.show_score" class="ShowScore">점수표시</label>
                    <label v-if="roomInfo.state === 0" class="Waiting">대기중</label>
                    <label v-else-if="roomInfo.state === 1" class="Playing">진행중</label>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <InputPasswordDialog ref="InputPasswordDialogComponent" :show="showInputPasswordDialog" @close="showInputPasswordDialog = false" v-bind:socket="socket"/>
    </Teleport>
</template>

<script>
import io from 'socket.io-client';
import * as sock_const from "../../../../common/constant/socket-constants.js";
import * as game_const from "../../../../common/constant/game-constants.js";
import InputPasswordDialog from '@/components/Lobby/InputPasswordDialog.vue';

export default {
    name: 'Rooms',
    data() {
        return {
            showInputPasswordDialog: false,
            filterPasswordRequired: 'all',
            filterRound: 'all',
            filterShowScore: 'all',
            filterName: '',
            filteredRoomList: [],
            roomList: [],
        }
    },
    props: {
        socket: { type: io.Socket, required: true },
    },
    components: {
        InputPasswordDialog: InputPasswordDialog
    },
    methods: {
        setRooms(roomList) {
            this.roomList = roomList;
            this.filteredRoomList = this.roomList;
            this.applyFilter();
        },
        applyFilter() {
            this.filteredRoomList = {};
            if (this.filterPasswordRequired == "all") {
                this.filteredRoomList = this.roomList;
            } else if (this.filterPasswordRequired == "required") {
                this.filteredRoomList = Object.values(this.roomList).filter(roomInfo => roomInfo.password_required);
            } else if (this.filterPasswordRequired == "not_required") {
                this.filteredRoomList = Object.values(this.roomList).filter(roomInfo => !roomInfo.password_required);
            }

            if (this.filterRound == "all") {
                this.filteredRoomList = this.filteredRoomList;
            } else if (this.filterRound == 10) {
                this.filteredRoomList = Object.values(this.filteredRoomList).filter(roomInfo => roomInfo.round_count == 10);
            } else if (this.filterRound == 15) {
                this.filteredRoomList = Object.values(this.filteredRoomList).filter(roomInfo => roomInfo.round_count == 15);
            } else if (this.filterRound == 20) {
                this.filteredRoomList = Object.values(this.filteredRoomList).filter(roomInfo => roomInfo.round_count == 20);
            }

            if (this.filterShowScore == "all") {
                this.filteredRoomList = this.filteredRoomList;
            } else if (this.filterShowScore == "show") {
                this.filteredRoomList = Object.values(this.filteredRoomList).filter(roomInfo => roomInfo.show_score);
            } else {
                this.filteredRoomList = Object.values(this.filteredRoomList).filter(roomInfo => !roomInfo.show_score);
            }

            if (this.filterName == "") {
                this.filteredRoomList = this.filteredRoomList;
            } else {
                this.filteredRoomList = Object.values(this.filteredRoomList).filter(roomInfo => roomInfo.name.indexOf(this.filterName) == 0);
            }
        },
        btnRefreshClicked() {
            this.socket.emit(sock_const.RequestType.ROOM_LIST, '');
        },
        onRoomClicked(roomInfo) {
            if (roomInfo.state == game_const.GameState.WAITING) {
                if(roomInfo.password_required) {
                    this.showInputPasswordDialog = true;
                    this.$refs.InputPasswordDialogComponent.init(roomInfo.rid);
                } else {
                    this.socket.emit(sock_const.RequestType.JOIN_ROOM, {
                        rid: roomInfo.rid,
                        socket_id: this.socket.id,
                        oid: this.$store.getters["Users/getUser_oid"],
                        nickname: this.$store.getters["Users/getUser_nickname"]
                    });
                }
            }
        },
    },
    mounted() {
        this.socket.on(sock_const.ResponseType.RES_ROOM_LIST, (data) => {
            this.roomList = data;
            this.applyFilter();
        });

        this.socket.emit(sock_const.RequestType.ROOM_LIST, '');
    },
}
</script>

<style scoped>
.Rooms {
    background-color: #F9F6F6;
    width: 640px;
    height: 600px;
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

.BtnRefresh {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: #A8A8A8;
    box-shadow: 2px 2px rgb(209, 209, 209);
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
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

.Enable {
    background-color: #ffffff;
    box-shadow: 2px 2px rgb(209, 209, 209);
}

.Disable {
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
    width: 24px;
    height: 24px;
    user-select: none;
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
    float: right;
}

.RoomInfo2 .Playing {
    color: #a11414;
    font-weight: bold;
    font-size: 14pt;
    user-select: none;
    float: right;
}
</style>