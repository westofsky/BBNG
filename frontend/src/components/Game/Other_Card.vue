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
    width: 95.5px;
    height: 137px;
    position: relative;
    background-size: cover;
  }
  </style>
  