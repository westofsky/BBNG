<template>
    <div class="Register">
        <div class="contents">
            <div class = "title">
                <div></div>
                <h1>회원가입</h1>
                <div class="close close1" @click = "close_popup"></div>
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
</template>

<script>
import GoogleButton from './GoogleButton.vue';
    export default {
        name: 'Register',
        components : {
            GoogleButton
        },
        data (){
            return {
                user_id : '',
                id_chk : false,
                user_pw : '',
                user_nickname : '',
                nick_chk : false,
            }
        },
        methods : {
            close_popup(){
                this.$emit('event-isActive',true);
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
        }
    }
</script>

<style scoped>
.title {
    display:flex;
    width:100%;
    justify-content: space-between;
    align-items: center;
}
.title h1{
    margin-left : 45px;
}
.close {
    position:relative;
    display:inline-block;
    *display:inline;
    width:50px;
    height:50px;
    text-align:center;
    cursor:pointer
}

.close1:after {content: "\00d7"; font-size:25pt;line-height:50px;}
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
.Register .contents{
    width:350px;
    min-height : 460px;
    display : block;
    padding: 10px 30px;
    border-radius: 30px;
    background-color : white;
    background-color: rgba( 255, 255, 255 );
}

.Register .contents .title{
    text-align: center;
    margin-bottom : 25px;
}

.Register .contents .id{
    text-align: center;
    margin-bottom : 50px;
    display : flex;
    flex-direction: row;
}
.Register .contents .password{
    margin-bottom : 35px;
}

.Register .contents .nickname{
    text-align: center;
    display : flex;
    flex-direction: row;
}

.Register .contents .login .register_btn{
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

.Register .contents .login .register_btn:hover{
  background: #21825B;
}
.Register input{
    width:70%;
}

.Register .password input{
    width:100%;
}
.Register .check{
    width:30%;
}

.Register .check_btn{
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

.Register .disabled{
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

.Register .check_btn:hover{
    background-color: #048a59;
}
</style>