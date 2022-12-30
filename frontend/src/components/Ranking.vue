<template>
    <div class="Ranking RoundBorder">
        <label class="Title">랭킹</label>
        <hr style="margin-top: 8px" />
        <div v-for="rankInfo in rankInfoList">
            <div class="RankArea">
                <label>{{ rankInfo.nick }}</label>
                <label style="float:right;"></label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ranking',
    data() {
        return {
            rankInfoList: [
                { tier: "Challenger", nick: "Nickname1", point: 99999 },
                { tier: "Challenger", nick: "Nickname2", point: 99999 },
                { tier: "Challenger", nick: "Nickname3", point: 99999 },
                { tier: "Challenger", nick: "Nickname3", point: 99999 },
                { tier: "Challenger", nick: "Nickname4", point: 99999 },
                { tier: "Challenger", nick: "Nickname5", point: 99999 },
                { tier: "Challenger", nick: "Nickname6", point: 99999 },
                { tier: "Challenger", nick: "Nickname7", point: 99999 },
                { tier: "Challenger", nick: "Nickname8", point: 99999 },
                { tier: "Challenger", nick: "Nickname9", point: 99999 },
                { tier: "Challenger", nick: "Nickname10", point: 99999 },
                { tier: "Challenger", nick: "Nickname11", point: 99999 }
            ]
        }
    },
    methods: {
        loadRanking: function () {

        }
    },
}
</script>

<style scoped>
.Ranking {
    background-color: #123123;
    width: 304px;
    height: 800px;
    text-align: center;
    padding: 8px;
}

.RoundBorder {
    border-radius: 8px;
}

.Title {
    font-size: 32pt;
    color: #ffffff;
}

.RankArea{

}
</style>