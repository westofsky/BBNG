<template>
    <div class="score-board">
        <div class="score-board-title">점수판</div>
        <div class="score-board-table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="(value, key) in players" :key="key">{{ key }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(round, index) in rounds" :key="index">
                        <td>{{ round }}</td>
                        <td v-for="(value, key) in players" :key="key" class="score">{{ scores[round][key] }}</td>
                    </tr>
                    <tr>
                        <td>합계</td>
                        <td v-for="(value, key) in players" :key="key" class="score">{{ value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            players: {},
            rounds: [],
            scores: {},
        }
    },
    methods: {
        updateRoundResults(players, roundResults) {
            this.players = players.reduce((acc, player) => {acc[player] = 0; return acc;}, {});
            this.rounds = roundResults.map((roundResult) => 'Round ' + roundResult.round);
            this.scores = {};

            roundResults.forEach((roundResult) => {
                this.rounds.forEach((round) => {
                    if (!this.scores[round]) {
                        this.scores[round] = {};
                    }
                    Object.entries(roundResult.player_score).forEach(([player, score]) => {
                        if (!this.scores[round][player]) {
                            this.scores[round][player] = 0;
                        }

                        if ('Round ' + roundResult.round === round) {
                            this.players[player] += score;
                            this.scores[round][player] += score;
                        }
                    });
                });
            });

            console.log(this.players);
        }
    }
}
</script>
  
<style scoped>
.score-board {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 640px;
    height: 480px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 16px;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    border-radius: 16px;
    overflow: auto;
}

.score-board-title {
    position: sticky;
    color: white;
    font-size: 24px;
    font-weight: bold;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 16px;
}

.score-board-table-wrapper {
    height: calc(100% - 50px);
    overflow: auto;
}

table {
    width: 100%;
    height: auto;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid white;
    padding: 10px;
    text-align: center;
    line-height: 48px;
}

th {
    background-color: white;
    color: black;
    font-weight: bold;
}

tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.1);
}

tr:first-child td {
    border-top: 0;
    /* 첫 번째 행에 대한 상단 구분선 제거 */
}

tr td:first-child {
    border-left: 0;
    /* 첫 번째 열에 대한 좌측 구분선 제거 */
}
</style>