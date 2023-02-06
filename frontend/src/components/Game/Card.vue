<template>
    <div
      class="square"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      :style="{
        left: x + 'px',
        top: y + 'px',
        'background-image': `url(${image_src})`
      }"
    ></div>
  </template>
  
  <script>
  export default {
    props : {
        image_src : Array,
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
        initialY: 0
      };
    },
    methods: {
      handleMouseDown(event) {
        this.initialX = event.clientX - this.x;
        this.initialY = event.clientY - this.y;
        this.isDragging = true;
      },
      handleMouseUp() {
        this.isDragging = false;
      },
      handleMouseMove(event) {
        if (this.isDragging) {
          this.currentX = event.clientX - this.initialX;
          this.currentY = event.clientY - this.initialY;
          this.x = this.currentX;
          this.y = this.currentY;
          console.log(this.x);
          console.log(this.y);
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
  }
  </style>
  