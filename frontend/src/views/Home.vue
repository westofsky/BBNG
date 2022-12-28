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
                    <p>회원가입</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: 'Home',
    }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
  