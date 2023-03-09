<template>
    <div class="Home">
        <div class="wrapper">
            <div class="title">
                <h1>우리들의 민속게임 뽕</h1>
            </div>
            <div class="contents">
                <div class="input_box id">
                    <label for="id">아이디</label>
                    <input type="text" id="id" v-model="login_id" placeholder="아이디">
                </div>
                <div class="input_box password">
                    <label for="password">비밀번호</label>
                    <input type="password" v-model="login_pw" placeholder="비밀번호" @keyup.enter="login">
                </div>
                <div class="login"><a class="login_btn" @click="login">로그인</a></div>
                <div class="login_google"><a class="login_btn" @click="login_google">구글로 로그인</a></div>
                <div class="extra">
                    <p>아이디/비밀번호 찾기</p>
                    <p style="cursor:pointer" @click="to_register">회원가입</p>
                </div>
            </div>
        </div>
        <div class="popup_register" v-if="isActive_register">
            <Register @event-isActive="setIsActive" />
        </div>
    </div>
</template>

<script>
import Register from '../components/Home/Register.vue';
import { googleTokenLogin } from 'vue3-google-login';
import io from 'socket.io-client';
import * as sock_const from "../../../common/constant/socket-constants.js";

export default {
    name: 'Home',
    components: {
        Register
    },
    beforeCreate() {
        this.$store.commit("Users/setUser_oid", "");
        this.$store.commit("Users/setUser_nickname", "");
    },
    data() {
        return {
            login_id: '',
            login_pw: '',
            isActive_register: false,
            login_token: '',
        }
    },
    methods: {
        to_register() {
            this.isActive_register = true;
        },
        setIsActive(data) {
            if (data) {
                this.isActive_register = false;
            }
        },
        login() {
            if (this.login_id == '') {
                alert("아이디 입력하세요.");
                return false;
            }
            if (this.login_pw == '') {
                alert("비밀번호를 입력하세요.");
                return false;
            }
            this.$axios.post('/api/users/login', {
                type: 1,
                user_id: this.login_id,
                user_pw: this.login_pw,
            }).then((res) => {
                if (res.data.status == 200) {
                    this.$store.commit("Users/setUser_oid", res.data._id);
                    this.$store.commit("Users/setUser_nickname", res.data.nickname);
                    this.$socket.value = io('http://localhost:3000', { transports: ['websocket'] });
                    this.$socket.value.on(sock_const.ResponseType.RES_ADD_USER_TO_LIST, () => {
                        this.$router.push({ name: 'Lobby' });
                    });
                    this.$socket.value.emit(sock_const.RequestType.ADD_USER_TO_LIST,
                        {
                            nickname: this.$store.getters["Users/getUser_nickname"]
                        }
                    );
                }
                else if (res.data.status == 500) {
                    alert(res.data.msg);
                }
            });
        },
        login_google() {
            googleTokenLogin().then((response) => {
                this.login_token = response.access_token;
                this.$axios.post('/api/users/login', {
                    type: 2,
                    user_token: this.login_token,
                }).then((res) => {
                    if (res.data.status == 200) {
                        alert(res.data.msg);
                        this.$store.commit("Users/setUser_oid", res.data._id);
                        this.$store.commit("Users/setUser_nickname", res.data.nickname);
                        this.$router.push({ name: 'Lobby' });
                    }
                    else if (res.data.status == 500) {
                        alert(res.data.msg);
                    }
                });
            })

        }
    }
}
</script>
<style scoped>
.Home {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Home::after {
    height: 100%;
    width: 100%;
    content: "";
    background-image: url("../assets/images/Home.jpg");
    background-size: 100% 100%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.wrapper {
    width: 350px;
    min-height: 460px;
    padding: 10px 30px;
    border-radius: 30px;
    background-color: white;
    background-color: rgba(255, 255, 255, 0.75);
}

.wrapper .title {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    position: relative;
    padding-bottom: 25px;
    border-bottom: 2px solid #aaa6a6;
    margin-bottom: 45px;
}

.contents .input_box {
    display: flex;
    flex-direction: column;
    position: relative;
}

.contents .id {
    margin-bottom: 35px;
}

.contents label {
    font-size: 13px;
    height: 20px;
    position: absolute;
    top: -24px;
    color: #151515;
}

.contents input {
    font-size: 16px;
    padding: 10px 15px;
    border: 2px solid #a19d9d;
    color: #111;
    font-family: SpoqaHanSansNeo;
    font-weight: 500;
    margin-top: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 14px;
    height: 40px;
}

.contents .login {
    padding-top: 20px;
}

.contents .login_google {
    margin-top: 20px;
}

.contents .login_btn {
    border-radius: 4px;
    background: #2d5188;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    text-decoration-line: none;
}

.contents p {
    margin: 0;
    padding: 5px;
}

.contents .extra {
    margin-top: 10px;
    display: flex;
    float: right;
}

.popup_register {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
}
</style>
