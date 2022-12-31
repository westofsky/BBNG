<template>
    <div class="Home">
        <div class="wrapper">
            <div class = "title">
                <h1>우리들의 민속게임 뽕</h1>
            </div>
            <div class="contents">
                <div class="input_box id">
                    <label for="id">아이디</label>
                    <input type="text" id="id" placeholder="아이디">
                </div>
                <div class="input_box password">
                    <label for="password">비밀번호</label>
                    <input type="password" placeholder="비밀번호" >
                </div>
                <div class="login"><a class="login_btn">로그인</a></div>
                <div class = "extra">
                    <p>아이디/비밀번호 찾기</p>
                    <p @click = "register">회원가입</p>
                </div>
            </div>
        </div>
        <div class="popup_register" v-if="isActive_register">
            <div class="contents">
                <div class = "title">
                    <h1>회원가입</h1>
                </div>
                <div class="input_box id">
                    <label for="id">아이디</label>
                    <input type="text" id="id" placeholder="아이디">
                    <div class="check"><a class="check_btn">중복확인</a></div>
                </div>
                <div class="input_box password">
                    <label for="password">비밀번호</label>
                    <input type="password" placeholder="비밀번호" >
                </div>
                <div class="input_box nickname">
                    <label for="nickname">닉네임</label>
                    <input type="text" placeholder="닉네임" >
                    <div class="check"><a class="check_btn">중복확인</a></div>
                </div>
                <div class="login">
                    <GoogleButton></GoogleButton>
                    <a class="register_btn">회원가입</a>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import GoogleButton from '../components/GoogleButton.vue';
export default {
    name: 'Home',
    components : {
        GoogleButton
    },
    data(){
        return {
            isActive_register : false,
        }
    },
    methods : {
        register(){
            this.isActive_register = true;
        }
    }
}
</script>
<style scoped>
.Home{
    height:100%;
    width:100%;
    position: relative;
    z-index: 1;
    display : flex;
    justify-content: center;
    align-items: center;
}
.Home::after{
    height:100%;
    width:100%;
    content : "";
    background-image: url("../assets/images/Home.jpg");
    background-size : 100% 100%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.wrapper{
    width:350px;
    min-height : 460px;
    padding: 10px 30px;
    border-radius: 30px;
    background-color : white;
    background-color: rgba( 255, 255, 255, 0.75 );
}

.wrapper .title{
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    position: relative;
    padding-bottom: 25px;
    border-bottom: 2px solid #aaa6a6;
    margin-bottom: 45px;   
}

.contents .input_box{
    display : flex;
    flex-direction : column;
    position : relative;
}

.contents .id{
    margin-bottom : 35px;
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

.contents .login{
    padding-top : 20px;
}

.contents .login_btn{
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
}

.contents p{
    margin : 0;
    padding : 5px;
}

.contents .extra {
    margin-top : 10px;
    display : flex;
    float : right;
}

.popup_register{
    display : flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    position:fixed;
    width : 100%;
    height : 100%;
    background: rgba(0, 0, 0, .8);
}
.popup_register .contents{
    width:350px;
    min-height : 460px;
    display : block;
    padding: 10px 30px;
    border-radius: 30px;
    background-color : white;
    background-color: rgba( 255, 255, 255 );
}

.popup_register .contents .title{
    text-align: center;
    margin-bottom : 50px;
}

.popup_register .contents .id{
    text-align: center;
    margin-bottom : 50px;
    display : flex;
    flex-direction: row;
}
.popup_register .contents .password{
    margin-bottom : 35px;
}

.popup_register .contents .nickname{
    text-align: center;
    display : flex;
    flex-direction: row;
}

.popup_register .contents .login .register_btn{
    border-radius: 4px;
    background: #00AE68;
    width: 100%;
    height: 40px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
}
.popup_register input{
    width:70%;
}

.popup_register .password input{
    width:100%;
}
.popup_register .check{
    width:30%;
}

.popup_register .check_btn{
    border-radius: 4px;
    background: #84ca5c;
    width: 100%;
    height: 40px;   
    line-height: 40px;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    display: inline-block;
    margin-top : 5px;
}
</style>
  