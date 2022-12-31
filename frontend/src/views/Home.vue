<template>
    <div class="Home">
        <div class="wrapper">
            <div class = "title">
                <h1>우리들의 민속게임 뽕</h1>
            </div>
            <div class="contents">
                <div class="input_box id">
                    <label for="id">아이디</label>
                    <input type="text" id="id" v-model = "login_id" placeholder="아이디">
                </div>
                <div class="input_box password">
                    <label for="password">비밀번호</label>
                    <input type="password" v-model = "login_pw" placeholder="비밀번호" >
                </div>
                <div class="login"><a class="login_btn" @click = "login">로그인</a></div>
                <div class = "extra">
                    <p>아이디/비밀번호 찾기</p>
                    <p @click = "to_register">회원가입</p>
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
                    <input type="text" id="id"
                        v-model = "user_id" 
                        placeholder="아이디" 
                        :disabled = "id_chk"
                        oninput="javascript: this.value = this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' );">
                    <div class="check"><button @click = "chk_id_dup" :class="[id_chk ? 'disabled' : 'check_btn']" :disabled = "id_chk">중복확인</button></div>
                </div>
                <div class="input_box password">
                    <label for="password">비밀번호</label>
                    <input type="password" v-model = "user_pw" placeholder="비밀번호" >
                </div>
                <div class="input_box nickname">
                    <label for="nickname">닉네임</label>
                    <input type="text" v-model = "user_nickname" placeholder="닉네임" :disabled = "nick_chk">
                    <div class="check"><button @click = "chk_nick_dup" :class="[nick_chk ? 'disabled' : 'check_btn']" :disabled = "nick_chk">중복확인</button></div>
                </div>
                <div class="login">
                    <GoogleButton></GoogleButton>
                    <button class="register_btn" @click = "register">회원가입</button>
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
            login_id : '',
            login_pw : '',
            isActive_register : false,
            user_id : '',
            id_chk : false,
            user_pw : '',
            user_nickname : '',
            nick_chk : false,
        }
    },
    methods : {
        to_register(){
            this.isActive_register = true;
        },
        chk_id_dup(){
            if(this.user_id == ''){
                alert("아이디를 입력해주세요.");
                return false;
            }
            this.$axios.post('/api/users/register',{
                type : 1,
                user_id : this.user_id,
            }).then((res) =>{
                if(res.data.status == 200){
                    alert(res.data.msg);
                    this.id_chk = true;
                    
                }
                else if(res.data.status == 500){
                    alert(res.data.msg);
                }
            });
        },
        chk_nick_dup(){
            if(this.user_nickname == ''){
                alert("닉네임을 입력해주세요.");
                return false;
            }
            this.$axios.post('/api/users/register',{
                type : 3,
                user_nickname : this.user_nickname,
            }).then((res) =>{
                if(res.data.status == 200){
                    alert(res.data.msg);
                    this.nick_chk = true;
                    
                }
                else if(res.data.status == 500){
                    alert(res.data.msg);
                }
            });
        },
        register(){
            if(!this.id_chk){
                alert("아이디 중복확인을 해주세요.");
                return false;
            }
            if(this.user_pw == ''){
                alert("비밀번호를 입력하세요.");
                return false;
            }
            if(!this.nick_chk){
                alert("닉네임 중복확인을 해주세요.");
                return false;
            }
            this.$axios.post('/api/users/register',{
                type : 4,
                user_id : this.user_id,
                user_pw : this.user_pw,
                user_nickname : this.user_nickname,
            }).then((res) =>{
                if(res.data.status == 200){
                    alert(res.data.msg);
                    this.$router.push({name : 'Home'});
                    this.$router.go()
                }
                else if(res.data.status == 500){
                    alert(res.data.msg);
                }
            });
        },
        login(){
            if(this.login_id == ''){
                alert("아이디 입력하세요.");
                return false;
            }
            if(this.login_pw == ''){
                alert("비밀번호를 입력하세요.");
                return false;
            }
            this.$axios.post('/api/users/login',{
                type : 1,
                user_id : this.login_id,
                user_pw : this.login_pw,
            }).then((res) =>{
                if(res.data.status == 200){
                    alert(res.data.msg);
                    this.$router.push({name : 'Lobby'});
                }
                else if(res.data.status == 500){
                    alert(res.data.msg);
                }
            });
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
    cursor : pointer;
    text-decoration-line: none;
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
    margin-top:30px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
}

.popup_register .contents .login .register_btn:hover{
  background: #21825B;
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
    border : none;
    background-color: #04AA6D;
    width: 100%;
    height: 40px;   
    line-height: 40px;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    display: inline-block;
    margin-top : 5px;
    cursor: pointer;
    text-decoration-line: none;
}

.popup_register .disabled{
    border-radius: 1px;
    background-color: #525755;
    width: 100%;
    height: 40px;   
    line-height: 40px;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    display: inline-block;
    margin-top : 5px;
    cursor: pointer;
    text-decoration-line: none;
}

.popup_register .check_btn:hover{
    background-color: #048a59;
}
</style>
  