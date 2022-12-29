<template>
    <div class="Lobby">
        <div class="Ranking">

        </div>
        <div class="Rooms">

        </div>
        <div>
            <div class="Friends">

            </div>
            <div class="Chatting">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Lobby',
}
</script>

<style scoped>
.Lobby {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Ranking {
    background-color: #123123;
    width: 320px;
    height: 800px;
}

.Rooms {
    background-color: #666666;
    width: 640px;
    height: 800px;
    margin-left: 32px;
    margin-right: 32px;
}

.Friends {
    background-color: #555111;
    width: 320px;
    height: 384px;
    margin-bottom: 32px;
}

.Chatting {
    background-color: #232642;
    width: 320px;
    height: 384px;
}
</style>