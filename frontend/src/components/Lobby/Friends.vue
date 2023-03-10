<template>
    <div class="Friends RoundBorder" v-if="!is_requested_clicked">
        <div style="position: relative; margin-top: 8px;">
            <div class="AccpetFriend" v-if="is_requested">
                <a href="#" class="btnAccept" @click="Accept_Friend">친구요청</a>
            </div>
            <div class="AddFriend">
                <a href="#" class="btn" @click="Add_Friend">친구추가</a>
            </div>
            <label class="Title">친구</label>
            <label class="OnlineCount">온라인: {{ online_count }}명</label>
        </div>
        <hr style="margin: 8px;" />
        <div class="FriendList">
            <div :class="friendInfo.state === 'online' ? 'FriendInfo Online' : 'FriendInfo Offline'"
                v-for="friendInfo in friendList" :key="friendInfo">
                <label class="Name">{{ friendInfo.nickname }}</label>
                <label v-if="friendInfo.online === 1" class="Online">온라인</label>
                <label v-else class="Offline">오프라인</label>
            </div>
        </div>
    </div>
    <div class="Friends RoundBorder Requests" v-else>
        <div style="position: relative; margin-top: 8px; display:flex ; justify-content: space-between;">
            <div class="close close1" style="visibility : hidden"></div>
            <label class="Title">친구요청</label>
            <div class="close close1" @click="close_accepted"></div>
        </div>
        <hr style="margin: 8px;" />
        <div class="FriendList">
            <div class="FriendInfo" v-for="(friendInfo, index) in is_requested_list" :key="friendInfo">
                <label class="Name">{{ friendInfo }}</label>
                <label class="Accept" @click="accept(index)">O</label>
                <label class="Reject" @click="reject(index)">X</label>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import * as sock_const from "../../../../common/constant/socket-constants.js";
export default {
    name: 'Friends',
    data() {
        return {
            friendList: [],
            is_requested: false,
            is_requested_clicked: false,
            is_requested_list: [],
            online_list: [],
            online_count: 0,
        }
    },
    props: {
    },
    methods: {
        async refreshData() {
            this.$socket.value.emit(sock_const.RequestType.ONLINE_LIST);
            await this.get_requests();
            await this.get_friends();
        },
        setFriends(friendList) {
            this.friendList = friendList;
            this.friendList.sort((v1, v2) => v2.state.localeCompare(v1.state));
        },
        Add_Friend() {
            var Friend_nickname = prompt("친구추가할 닉네임을 적으시오");
            if (Friend_nickname) {
                this.$axios.post('/api/friends/AddFriend', {
                    requester_nickname: this.$store.getters["Users/getUser_nickname"].toString(),
                    recipient_nickname: Friend_nickname,
                }).then((res) => {
                    if (res.data.status == 200) {
                        alert(res.data.msg);
                    }
                    else if (res.data.status == 500) {
                        alert(res.data.msg);
                    }
                });
            }
        },
        Accept_Friend() {
            this.is_requested_clicked = true;
        },
        async get_friends() {
            var user_nickname = await this.$store.getters["Users/getUser_nickname"];
            await this.$axios.post('/api/friends/getFriend', {
                user_nickname: user_nickname
            }).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    for (var i = 0; i < res.data.friend_list.length; i++) {
                        let friend_dict = {};
                        friend_dict['nickname'] = res.data.friend_list[i];
                        if (this.online_list.includes(res.data.friend_list[i])) {
                            friend_dict['online'] = 1;
                            this.online_count++;
                        }
                        else {
                            friend_dict['online'] = 0;
                        }
                        this.friendList.push(friend_dict);
                    }
                }
            });
        },
        async get_requests() {
            var user_nickname = await this.$store.getters["Users/getUser_nickname"];
            await this.$axios.post('/api/friends/FriendRequest', {
                nickname: user_nickname
            }).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.is_requested = true;
                    this.is_requested_list = res.data.request_list;
                }
            });
        },
        close_accepted() {
            this.is_requested_clicked = false;
        },
        accept(index) {
            var result = confirm(this.is_requested_list[index] + "을(를) 친구추가 하시겠습니까?");
            if (result) {
                var AcceptedJson = new Object();
                AcceptedJson.requester_nickname = this.is_requested_list[index];
                AcceptedJson.recipient_nickname = this.$store.getters["Users/getUser_nickname"].toString();
                this.$axios.post('/api/friends/AcceptFriend', {
                    AcceptedJson: AcceptedJson,
                }).then((res) => {
                    if (res.data.status == 200) {
                        alert(res.data.msg);
                        this.is_requested_list.splice(index, 1);
                    }
                    else if (res.data.status == 500) {
                        alert(res.data.msg);
                    }
                })
            }
        },
        reject(index) {
            var result = confirm(this.is_requested_list[index] + "의 친구신청을 거절하시겠습니까?");
            if (result) {
                var RejectedJson = new Object();
                RejectedJson.requester_nickname = this.is_requested_list[index];
                RejectedJson.recipient_nickname = this.$store.getters["Users/getUser_nickname"].toString();
                this.$axios.post('/api/friends/RejectFriend', {
                    RejectedJson: RejectedJson,
                }).then((res) => {
                    if (res.data.status == 200) {
                        alert(res.data.msg);
                        this.is_requested_list.splice(index, 1);
                    }
                    else if (res.data.status == 500) {
                        alert(res.data.msg);
                    }
                })
            }
        }
    },
    mounted() {
        this.$socket.value.on(sock_const.ResponseType.RES_ONLINE_LIST, (data) => {
            this.online_list = data;
        });
    }
}
</script>

<style scoped>
.Friends {
    background-color: #F9F6F6;
    width: 320px;
    height: 308px;
    text-align: center;
    flex-direction: column;
    display: flex;
    margin-top: 32px;
    margin-bottom: 32px;
}

.RoundBorder {
    border-radius: 8px;
}

.AccpetFriend {
    position: absolute;
    left: 8px;
    bottom: 0px;
    background-color: rgb(211, 235, 80);
    border-radius: 15px;
    overflow: hidden;
    padding: 2px;
    cursor: pointer;
    font-size: 0.6vw;
    width: 5vw;
    margin-bottom: 8%;
}

.AccpetFriend .btnAccept {
    color: black;
    text-decoration: none;
}

.AddFriend {
    position: absolute;
    left: 8px;
    bottom: 0px;
    background-color: rgb(57, 59, 197);
    border-radius: 15px;
    overflow: hidden;
    padding: 2px;
    cursor: pointer;
    font-size: 0.6vw;
    width: 5vw;
}

.AddFriend .btn {
    color: white;
    text-decoration: none;
}

.Title {
    font-size: 24pt;
    color: #000000;
    font-weight: bold;
    user-select: none;
}

.OnlineCount {
    font-size: 12pt;
    color: rgb(65, 248, 40);
    font-weight: bold;
    position: absolute;
    right: 8px;
    bottom: 0px;
    user-select: none;
}

.FriendList {
    flex: 1;
    display: flex;
    overflow: auto;
    flex-direction: column;
}

.FriendInfo {
    display: flex;
    margin: 0px 8px 8px 16px;
    border-radius: 8px;
    align-items: center;
}

.FriendInfo .Online {
    user-select: none;
    width: 64px;
    background-color: #6eda6b;
    padding: 8px;
    color: #ffffff;
    font-weight: bold;
    border-radius: 8px;
}

.FriendInfo .Offline {
    user-select: none;
    width: 64px;
    background-color: #ec5050;
    padding: 8px;
    color: #ffffff;
    font-weight: bold;
    border-radius: 8px;
}

.FriendInfo .Name {
    user-select: none;
    flex: 1;
    text-align: left;
    font-weight: bold;
    font-size: 14pt;
}

.Requests .close {
    position: relative;
    display: inline-block;
    *display: inline;
    width: 50px;
    height: 50px;
    text-align: center;
    cursor: pointer
}

.Requests .close1:after {
    content: "\00d7";
    font-size: 35pt;
    line-height: 50px;
}

.FriendInfo .Accept {
    width: 50px;
    background-color: #6eda6b;
    padding: 8px;
    color: #ffffff;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
}

.FriendInfo .Reject {
    width: 50px;
    background-color: #ec5050;
    padding: 8px;
    color: #ffffff;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
}
</style>