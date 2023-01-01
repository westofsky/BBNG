<template>
    <div class="Friends RoundBorder">
        <label class="Title">친구</label>
        <hr style="margin: 8px;" />
        <div class="FriendList">
            <div :class="friendInfo.state === 'online' ? 'FriendInfo Online' : 'FriendInfo Offline'"
                v-for="friendInfo in friendList">
                <label class="Name">{{ friendInfo.nickname }}</label>
                <label v-if="friendInfo.state === 'online'" class="Online">온라인</label>
                <label v-else class="Offline">오프라인</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Friends',
    data() {
        return {
            friendList: [
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
            ],
        }
    },
    methods: {
        setFriends(friendList) {
            this.friendList = friendList;
        },
    }
}
</script>

<style scoped>
.Friends {
    background-color: #ffffff;
    width: 320px;
    height: 384px;
    text-align: center;
    flex-direction: column;
    display: flex;
}

.RoundBorder {
    border-radius: 8px;
}

.Title {
    font-size: 16pt;
    color: #000000;
    margin-top: 8px;
    font-weight: bold;
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
    background-color: #6866fc;
    padding: 8px;
    ;
    color: #ffffff;
    font-weight: bold;
    border-radius: 8px;
}

.FriendInfo .Offline {
    user-select: none;
    width: 64px;
    background-color: #ec5050;
    padding: 8px;
    ;
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
</style>