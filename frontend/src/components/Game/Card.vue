<template>
  <div class="square" :class="{'border-highlight':highlight}" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @mousedown="handleMouseDown"
    @mouseup="handleMouseUp" :style="{
      zIndex: zIndex,
      left: x + 'px',
      top: y + 'px',
      'background-image': `url(${image_src})`,
    }"></div>
</template>

<script>

export default {
  props: {
    image_src: Array,
    card_index : Number,
    isDraggable : Boolean,
    card_length : Number,
  },
  data() {
    return {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      isDragging: false,
      currentX: 0,
      currentY: 0,
      initialX: 0,
      initialY: 0,
      highlight: false,
      zIndex: 1,
    };
  },
  methods: {
    handleMouseEnter() {
      if(this.isDraggable){
          if (!this.isDragging) {
          // 해당 카드 강조 효과 및 가장 앞으로 가져오기
            this.highlight = true;
            this.zIndex = 10;
        }
      }
      
    },
    handleMouseLeave() {
      if(this.isDraggable){
        if (!this.isDragging) {
          this.highlight = false;
          this.zIndex = 1;
        }
      }
    },
    handleMouseDown(event) { // 카드를 집었을때의 event
      if(this.isDraggable){
        this.initialX = event.clientX - this.x;
        this.initialY = event.clientY - this.y;
        this.isDragging = true;
      }
    },
    handleMouseUp() { // 카드를 놓았을때의 event
      console.log(this.card_length);
      this.isDragging = false; 
      if(this.y>=-500 && this.y<=-50 && this.x>=(this.card_index-1)*(-100)-160 + (this.card_length/3-1)*140 && this.x<=(this.card_length-this.card_index)*100){
        this.highlight = false;
        this.$emit("set-draggable", false);
      }
      else{
        this.x = 0;
        this.y = 0;
      }
    },
    handleMouseMove(event) {
      if(this.isDraggable){
        if (this.isDragging) {
          console.log("----initial----");
          console.log(this.initialX,this.initialY);
          console.log("----event----");
          console.log(event.clientX,event.clientY);
          
          this.currentX = event.clientX - this.initialX;
          this.currentY = event.clientY - this.initialY;
          this.x = this.currentX;
          this.y = this.currentY;
          // console.log(this.y);
        }
      }
      
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }
};
</script>

<style>
.square {
  width: 100px;
  height: 140px;
  position: relative;
  background-size: cover;
  box-sizing: border-box;
}

.border-highlight {
  width: 120px;
  height: 168px;
  border: 4px solid yellow;
  box-shadow: 0 0 10px black;
  background-color: yellow;
  border-radius: 8px 8px 8px 8px;
}
</style>
