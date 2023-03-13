<template>
  <div class="dropped_card small" :style="{
    'background-image': `url(${getImageSrc()})`,
  }"></div>
</template>
  
<script>
export default {
  props: {
    name: String,
  },
  data() {
    return {
    };
  },
  methods: {
    getImageSrc() {
      return require(`../../assets/images/cards/${this.name}.png`);
    },
  },
  mounted() {
  }
};
</script>
  
<style>
.dropped_card {
  width: 6vw;
  height: 8.4vw;
  position: relative;
  background-size: cover;
  box-sizing: border-box;
}

.small {
  width: 4vw;
  height: 5.6vw;
}
</style>
  