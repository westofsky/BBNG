<template>
    <div class="Rules">
        <div class = "wrapper">
            <div class = "title">
                <div class="close close1" style="visibility : hidden"></div>
                <h1>게임 도움말</h1>
                <div class="close close1"></div>
            </div>
            <div class = "contents">
                <div class ="wrap_p">
                    <p>대한민국 대표 게임인 뽕은 플레이어가 5장의 카드로 시작하며,<br>다양한 전략을 세워 이기는 게임입니다.</p><br>
                    <p>플레이어는 순서가 되면 카드 한 장을 뽑고,<br>카드 한장을 버려 카드 5장을 유지합니다.</p><br>
                    <p>어느 플레이어가 카드 한 장을 뽑았을 때, 조합이 완성되면 <br>라운드는 종료가 됩니다. 라운드는 총 10,15,20라운드가 있습니다.</p><br>
                    <p>첫 턴에 라운드가 종료 될 수는 없으며,<br>시계 반대 방향으로 차례가 바뀝니다.</p>
                </div>
            </div>
            <div class = "btnWrapper">
                <span class="pop-btn confirm" id="confirm">이전</span>
                <span class="pop-btn close" id="close">다음</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rules',
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<style scoped>
.Rules{
    display : flex;
    justify-content: center;
    align-content: center;
}
.wrapper {
    width : 800px;
    height: 600px;
    border-radius:10px;
    overflow:hidden;         
    background : rgba(255,255,255,0.8);
    box-shadow: 5px 10px 10px 1px rgba(0,0,0,.3); 
}

.wrapper .title{
    width:100%;
    height:11%;
    display:flex;
    align-items:center;
    justify-content: space-between;
    margin-top : 25px;
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

.close1:after {
    content: "\00d7";
    font-size:35pt;
    line-height:50px;
}
.wrapper .contents{
    width:100%;
    height:77%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.wrapper .contents .wrap_p{
}
.wrapper .contents p{
    font-size :30px;
    margin : 0;
    padding : 0;
}
.wrapper .btnWrapper{
    width:100%;
    height:8%;
    display:flex;
    align-items:center;
    justify-content:center;
}
.wrapper .pop-btn{ 
    display:inline-flex;           
    width:50%;           
    height:100%;                 
    justify-content:center;       
    align-items:center;           
    float:left;                    
    color:#ffffff;  
    background :   #3d5fbb;             
    cursor:pointer;  
    overflow: hidden;
}            
.wrapper .pop-btn:hover{
    background: #2d4995;
}
.wrapper .pop-btn:hover{
    background: #20346c;
}
.pop-btn.confirm{                 
    border-right:1px solid #3b5fbf;
}
</style>