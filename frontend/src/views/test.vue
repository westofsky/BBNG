<template>
    <div>
        <div class="card mover">
        </div>
    </div>
  </template>
  
<script>
export default {
    data() {
        return {
            cards: [
            ]
        }
    },
    methods: {
        draggable($target){
            let isPress = false;
            let prevPosX = 0;
            let prevPosY = 0;
            $target.onmousedown = start;
            $target.onmouseup = end;
            window.onmousemove = move;
            function start(e) {
                prevPosX = e.clientX;
                prevPosY = e.clientY;

                isPress = true;
            }

            function move(e) {
                if (!isPress) return;

                const posX = prevPosX - e.clientX; 
                const posY = prevPosY - e.clientY; 
                
                prevPosX = e.clientX; 
                prevPosY = e.clientY;
                
                $target.style.left = ($target.offsetLeft - posX) + "px";
                $target.style.top = ($target.offsetTop - posY) + "px";
                console.log(e.clientX,e.clientY);
            }

            function end() {
                isPress = false;
            }
        }
    },
    mounted() {
        const $target = document.querySelector(".mover");
        this.draggable($target);
    }
}
</script>
<style>
.card {
    width: 100px;
    height: 140px;
    background-image: url('../assets/images/cards/heart_1.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: bold;
    
    position: absolute;
    left: 50px;
    top: 50px;
    
    user-select: none;
    
    /*  drag cursor   */
    cursor: grab;
}
.card:active {
    cursor: grabbing;
}
</style>