<template>
    <div class="Rules">
        <div class = "wrapper">
            <div class = "title">
                <div class="close close1" style="visibility : hidden"></div>
                <h1>게임 도움말</h1>
                <div class="close close1" @click = "close_rules"></div>
            </div>
            <div class = "contents page1" v-if = "page==1">
                <div class ="wrap_p">
                    <p>대한민국 대표 게임인 뽕은 플레이어가 5장의 카드로 시작하며,<br>다양한 전략을 세워 이기는 게임입니다.</p><br>
                    <p>플레이어는 순서가 되면 카드 한 장을 뽑고,<br>카드 한장을 버려 카드 5장을 유지합니다.</p><br>
                    <p>어느 플레이어가 카드 한 장을 뽑았을 때, 조합이 완성되면 <br>라운드는 종료가 됩니다. 라운드는 총 10,15,20라운드가 있습니다.</p><br>
                    <p>첫 턴에 라운드가 종료 될 수는 없으며,<br>시계 반대 방향으로 차례가 바뀝니다.</p>
                </div>
            </div>
            <div class = "contents page2" v-if = "page==2">
                <div class ="wrap_p">
                    <p>카드 한 장을 뽑아 6장이 되었을 경우 만들 수 있는 조합은 다음과 같습니다.</p><br>
                </div>
                <div class = "wrap_divs">
                    <div class="wrap_content">
                        <p>2장,2장,2장이 같을 경우 : 0점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/heart_1.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/spade_2.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/diamond_5.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/spade_5.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/spade_3.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/diamond_3.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>3장,3장이 같을 경우 : -60점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/heart_1.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/spade_1.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/clover_1.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/spade_5.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/diamond_5.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/heart_5.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>2장,4장이 같을 경우 : -100점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/heart_1.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/clover_1.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/clover_5.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/spade_5.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/diamond_5.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/heart_5.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>6장 합이 10 이하인 경우 : -100점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/heart_1.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/clover_1.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/diamond_1.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/spade_1.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/clover_2.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/diamond_3.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>6장 합이 60 이상인 경우 : - 100점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/heart_12.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/diamond_12.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/spade_10.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/clover_9.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/spade_12.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/clover_12.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>26장이 연속인 숫자일 경우 : -숫자합</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/heart_4.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/diamond_5.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/heart_6.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/spade_7.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/clover_8.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/diamond_9.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                </div>
            </div>
            <div class = "contents page3" v-if = "page==3">
                <div class ="wrap_p">
                    <p>플레이어가 본인 차례가 아닐 때 취할 수 있는 행동</p><br>
                </div>
                <div class = "wrap_contents">
                    <div class="content1">
                        <p>&bull;뽕</p>
                        <p>다른 플레이어가 버린 카드를 2장 가지고 있을 때, 뽕을 할 수 있습니다. </p>
                    </div>
                    <div class="content2">
                        <div class = "section1">

                        </div>
                        <div class = "section2">

                        </div>
                    </div>
                </div>
            </div>
            <div class = "btnWrapper">
                <span class="pop-btn confirm" id="confirm" @click = "before_page">이전</span>
                <span class="pop-btn close" id="close" @click = "next_page">다음</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rules',
    data() {
        return {
            page:1,
        }
    },
    methods: {
        close_rules(){
            this.$emit('event-isRules',true);
        },
        before_page(){
            if(this.page == 1)
                return;
            else{
                this.page--;
            }
        },
        next_page(){
            if(this.page == 5)
                return;
            else{
                this.page++;
            }
        }
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
    width : 88vw;
    height: 55vw;
    border-radius:10px;
    overflow:hidden;         
    background : white;
    box-shadow: 5px 10px 10px 1px rgba(0,0,0,.3); 
}

.wrapper .title{
    width:100%;
    height:9%;
    display:flex;
    align-items:center;
    justify-content: space-between;
    margin-top : 3%;
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

.wrapper .page2{
    align-items: baseline;
    display : block;
}

.wrapper .page2 .wrap_divs{
    display : flex;
    flex-wrap: wrap;
    justify-content: center;
}
.wrapper .page2 .wrap_content{
    width: 26vw;
    margin: 1%;
    height: 16vw;
}

.wrapper .page2 .wrap_content p{
    font-size : 1.8vw;
}
.wrapper .page2 .wrap_content .wrap_cards{
    display : flex;
    align-items:center;
    height: 13vw;
    justify-content: center;
    position:relative;
}
.wrapper .page2 .wrap_content .wrap_cards img{
    position: absolute;
    object-fit: cover;
    height:12.5vw;
}
.wrapper .page3{
    align-items: baseline;
    display : block;
}
.wrapper .page3 .wrap_p{
    font-size: 1.8vw;
}
.wrapper .page3 .wrap_contents{
    margin-left : 4vw;
}
.wrapper .page3 .wrap_contents .content1{
    text-align : left;
}
.wrapper .contents p{
    font-size :2.7vw;
    margin : 0;
    padding : 0;
}
.wrapper .btnWrapper{
    width:100%;
    height:10%;
    font-size : 1.5rem;
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