<template>
    <div class="Game">
        {{rid}}
    </div>
</template>
  
<script>
export default {
    name: 'Game',
    data(){
        return {
            rid : '',
        }
    },
    methods : {
        
    },
    mounted(){
        this.rid = this.$store.getters["Games/getGame_rid"];
    }
}
</script>
<style scoped>
</style>
  