<template>
    <div
      class="other_cards"
      :style="{
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
      };
    },
    methods: {
      
    },
    mounted() {
    }
  };
  </script>
  
  <style>
  .other_cards {
    width: 4.25vw;
    height: 5.95vw;
    position: relative;
    background-size: cover;
  }
  </style>
  