<template>
    <div class="GoogleButton">
        <button @click="google_login">구글로 회원가입</button>
    </div>
</template>

<script>
import { googleTokenLogin } from 'vue3-google-login';
export default {
    name: 'GoogleButton',
    methods: {
        google_login() {
            googleTokenLogin().then((response) => {
                console.log(response.access_token);
                this.$axios.post('/api/users/getUserGoogleInfo', {
                    access_token: response.access_token,
                }).then((res) => {
                    this.$emit('event-GoogleisActive', res);
                });
            })
        }
    }
}
</script>

<style scoped>
.GoogleButton {
    width: 100%;
    height: 20px;
}

.GoogleButton button {
    border-radius: 4px;
    background: #00AE68;
    width: 100%;
    height: 40px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
}

.GoogleButton button:hover {
    background: #21825B;
}
</style>