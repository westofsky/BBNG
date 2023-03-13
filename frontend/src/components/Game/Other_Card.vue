<template>
  <div class="other_cards" :style="{
    'background-image': `url(${image_src})`
  }"></div>
</template>
  
<script>
export default {
  props: {
    image_src: String,
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
  position: relative;
  background-size: cover;
}
</style>
  