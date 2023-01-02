<template>
    <div class="Ranking RoundBorder">
        <label class="Title">랭킹</label>
        <hr style="margin: 8px;" />
        <div style="overflow: auto; flex: 1;">
            <div class="RankInfoArea" v-for="rankInfo in rankList">
                <img class="TierImage" src="../../assets/images/tier_challenger.png" />
                <label class="Nickname" >{{ rankInfo.nick }}</label>
                <img class="IconRankPoint" src="../../assets/images/icon_rankpoint.png"/>
                <label class="RankPoint" >{{ rankInfo.rank_point }}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ranking',
    data() {
        return {
            rankList: [{ tier: "Challenger", nick: "Nickname1", rank_point: 99999 },
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
            { tier: "Challenger", nick: "Nickname21", rank_point: 99999 },],
        }
    },
    methods: {
        setRanking(rankList) {
            this.rankList = rankList;
        }
    },
}
</script>

<style scoped>
.Ranking {
    background-color: #ffffff;
    width: 320px;
    height: 800px;
    text-align: center;
    flex-direction: column;
    display: flex;
}

.RoundBorder {
    border-radius: 8px;
}

.Title {
    font-size: 24pt;
    color: #000000;
    margin-top: 8px;
    font-weight: bold;
    user-select: none;
}

.RankInfoArea {
    display: flex;
    align-items: center;
    margin: 8px;
}

.RankInfoArea:hover{
    background-color: #acacac;
}

.TierImage {
    user-select: none;
    width: 48px;
    height: 48px;
}

.Nickname {
    user-select: none;
    margin-left: 16px;
    text-align: left;
    height: 48px;
    line-height: 48px;
    flex: 1;
    font-size: 16pt;
    text-overflow: ellipsis;
}

.IconRankPoint {
    user-select: none;
    width: 32px;
    height: 32px;
}

.RankPoint {
    user-select: none;
    height: 48px;
    line-height: 48px;
    margin-right: 8px;
    font-size: 16pt;
}
</style>