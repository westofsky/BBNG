<template>
    <div class="Friends RoundBorder">
        <div style="position: relative; margin-top: 8px;">
            <label class="Title">친구</label>
            <label class="OnlineCount">온라인: {{ friendList.length }}명</label>
        </div>
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
            friendList: [],
        }
    },
    methods: {
        setFriends(friendList) {
            this.friendList = friendList;
            this.friendList.sort((v1, v2) => v2.state.localeCompare(v1.state));
        },
    },
    mounted() {
        
    },
}
</script>

<style scoped>
.Friends {
    background-color: #F9F6F6;
    width: 320px;
    height: 384px;
    text-align: center;
    flex-direction: column;
    display: flex;
    margin-bottom: 32px;
}

.RoundBorder {
    border-radius: 8px;
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
</style>