<template>
    <div class="GoogleButton">
        <button @click = "google_login">구글로 회원가입</button>
    </div>
</template>

<script>
import {googleTokenLogin} from 'vue3-google-login';
    export default {
        name: 'GoogleButton',
        medthos : {
            google_login(){
                googleTokenLogin().then((response) => {
                    console.log("Handle the response", response)
                })
            }
        }
    }
</script>

<style scoped>
.GoogleButton{
    width : 100%;
    height : 20px;
}

.GoogleButton button{
    border-radius: 4px;
    background: #2d5188;
    width: 100%;
    height: 40px;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    display: inline-block;
    margin-bottom : 40px;
}
</style>