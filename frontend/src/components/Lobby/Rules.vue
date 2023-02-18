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
                            <img src = "../../assets/images/cards/H1.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/S2.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/D5.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/S5.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/S3.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/D3.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>3장,3장이 같을 경우 : -60점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/H1.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/S1.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/C1.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/S5.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/D5.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/H5.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>2장,4장이 같을 경우 : -100점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/H1.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/C1.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/C5.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/S5.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/D5.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/H5.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>6장 합이 10 이하인 경우 : -100점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/H1.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/C1.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/D1.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/S1.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/C2.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/D3.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>6장 합이 60 이상인 경우 : - 100점</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/H12.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/D12.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/S10.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/C9.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/S12.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/C12.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                    <div class="wrap_content">
                        <p>26장이 연속인 숫자일 경우 : -숫자합</p>
                        <div class="wrap_cards">
                            <img src = "../../assets/images/cards/H4.png" style="left : 0%; z-index : 1;">
                            <img src = "../../assets/images/cards/D5.png" style="left : 13%; z-index : 2;">
                            <img src = "../../assets/images/cards/H6.png" style="left : 26%; z-index : 3;">
                            <img src = "../../assets/images/cards/S7.png" style="left : 39%; z-index : 4;">
                            <img src = "../../assets/images/cards/C8.png" style="left : 52%; z-index : 5;">
                            <img src = "../../assets/images/cards/D9.png" style="left : 65%; z-index : 6;">
                        </div>
                    </div>
                </div>
            </div>
            <div class = "contents page3" v-if = "page==3">
                <div class ="wrap_p">
                    <p>플레이어가 본인 차례가 아닐 때 취할 수 있는 행동</p>
                </div>
                <div class = "wrap_contents">
                    <div class="content1">
                        <p>&bull;뽕</p>
                        <p style="font-size: 1.5vw;">다른 플레이어가 버린 카드를 2장 가지고 있을 때, 뽕을 할 수 있습니다. </p>
                    </div>
                    <div class="content2">
                        <div class = "section1">
                            <div class="wrap_divs">
                                <div class="wrap_cards">
                                    <img src = "../../assets/images/cards/H12.png" style="left : 0%; z-index : 1;">
                                    <img src = "../../assets/images/cards/D12.png" style="left : 13%; z-index : 2;">
                                    <img src = "../../assets/images/cards/H10.png" style="left : 26%; z-index : 3;">
                                    <img src = "../../assets/images/cards/S6.png" style="left : 39%; z-index : 4;">
                                    <img src = "../../assets/images/cards/C6.png" style="left : 52%; z-index : 5;">
                                </div>
                            </div>
                            <p>이런 경우 Q뽕이며, Q 2장을 내고 원하는 카드 한 장을 더 버릴 수 있습니다.(10을 버린 경우)</p>
                            <div class="wrap_divs">
                                <div class="wrap_cards">
                                    <img src = "../../assets/images/cards/S6.png" style="left : 0%; z-index : 4;">
                                    <img src = "../../assets/images/cards/C6.png" style="left : 13%; z-index : 5;">
                                </div>
                            </div>
                        </div>
                        <div class = "section2">
                            <p>남은 2장의 카드가 같을 경우 바가지이며, 다른 사람이 해당 카드를 내면 뽕을 할 수 있습니다. 해당 카드를 낸 플레이어는 바가지(+30점)을 받게 되고, 뽕을 한 플레이어는 0점을 얻게 됩니다. </p>
                            <div class="wrap_divs">
                                <div class="wrap_cards">
                                    <img src = "../../assets/images/cards/S6.png" style="left : 0%; z-index : 4;">
                                    <img src = "../../assets/images/cards/C6.png" style="left : 13%; z-index : 5;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "contents page4" v-if = "page==4">
                <div class ="wrap_p">
                    <p>플레이어가 본인 차례가 아닐 때 취할 수 있는 행동</p>
                </div>
                <div class = "wrap_contents">
                    <div class="content1">
                        <p>&bull;뽕</p>
                        <div class="p_content">
                            <p>한 플레이어가 뽕을 하게 되면, 순서는 뽕을 한 플레이어부터 다시 시계방향으로 턴이 진행됩니다.</p>
                            <p>뽕을 하여 숫자가 다른 카드 2장을 갖고 있을 때, 카드 뽑고 버리기를 통해 같은 카드 2장을 만들 수 있으며, 이때는 다시 바가지가 됩니다.</p>
                            <p>카드 2장을 갖고 있는 상태에서 다른 플레이어가 라운드를 끝낸다면, 본인은 갖고 있는 2장의 숫자 합 만큼의 점수를 얻게 됩니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "contents page5" v-if = "page==5">
                <div class ="wrap_p">
                    <p>플레이어가 본인 차례일 때 취할 수 있는 행동</p>
                </div>
                <div class = "wrap_contents">
                    <div class="content1">
                        <p>&bull;카드 뽑고 버리기</p>
                        <div class="p_content">
                            <p>카드 한 장을 뽑고 원하는 카드 한 장을 버릴 수 있습니다. 이때 조합이 완성되면 게임을 끝낼 수 있습니다.</p>
                        </div>
                        <p>&bull;자연</p>
                        <div class="p_content">
                            <p>카드 한 장을 뽑은 뒤, 같은 숫자의 카드가 3장 있으면 자연을 외치고 한 장을 더 버릴 수 있습니다.</p>
                            <p>이때 남은 카드가 같으면 마찬가지로 뽕을 할 수 있습니다.</p>
                        </div>
                        <p>&bull;스톱</p>
                        <div class="p_content">
                            <p>뽕을 하게 되어 카드가 2장이 남고, 다른 플레이어도 뽕을 하여 2장의 카드가 남았을 때,본인의 카드 숫자 합이 4이하면 스톱을 할 수 있습니다. </p>
                            <p>이때 뽕을 한 다른 플레이어의 카드 숫자 합보다 크거나 같으면 스톱을 한 플레이어가 바가지(+30점)을 받게 됩니다.</p>
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
            if(this.page ==5)
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
    width : 77vw;
    height: 45vw;
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

.wrapper .contents p{
    font-size :2.2vw;
    margin : 0;
    padding : 0;
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
    width: 24vw;
    margin: 1%;
    height: 11vw;
}
.wrapper .page2 .wrap_p p{
    font-size : 2vw;
    padding-top:1.5vw;
}
.wrapper .page2 .wrap_content p{
    font-size : 1.4vw;
    margin-top:1vw;
}
.wrapper .page2 .wrap_content .wrap_cards{
    display : flex;
    align-items:center;
    height: 11vw;
    justify-content: center;
    position:relative;
}
.wrapper .page2 .wrap_content .wrap_cards img{
    position: absolute;
    object-fit: cover;
    height:8.5vw;
}
.wrapper .page3{
    align-items: baseline;
    display : block;
}
.wrapper .page3 .wrap_p{
    font-size: 1.8vw;
    padding-top:1.5vw;
}
.wrapper .page3 .wrap_contents{
    margin-left : 4vw;
    margin-right : 4vw;
    height:100%;
}
.wrapper .page3 .wrap_contents .content1{
    text-align : left;
}

.wrapper .page3 .wrap_contents .content2{
    display:flex;
    height:100%;
}

.wrapper .page3 .wrap_contents .content2 .section1{
    width:50%;
    height:100%;
}

.wrapper .page3 .wrap_contents .wrap_cards{
    display : flex;
    align-items:center;
    height: 10vw;
    justify-content: center;
    position:relative;
}
.wrapper .page3 .wrap_contents .wrap_cards img{
    position: absolute;
    object-fit: cover;
    height:8.5vw;
}

.wrapper .page3 .wrap_contents .content2 .section1 p{
    font-size: 1.5vw;
    text-align : left;
}

.wrapper .page3 .wrap_contents .content2 .section2{
    width : 50%;
    height:100%;
    padding-top:6vw;
}
.wrapper .page3 .wrap_contents .content2 .section2 p{
    font-size: 1.5vw;
    text-align : left;
}

.wrapper .page4{
    display:block;
}
.wrapper .page4 .wrap_contents{
    margin-left:4vw;
    margin-right:4vw;
    height:100%;
}
.wrapper .page4 .wrap_p{
    font-size: 1.8vw;
    padding-top:1.5vw;
}
.wrapper .page4 .wrap_contents .content1{
    text-align : left;
}
.wrapper .page4 .wrap_contents .content1 .p_content{
    margin-top:1vw;
}
.wrapper .page4 .wrap_contents .content1 .p_content p{
    font-size: 1.8vw;
    margin-top:1vw;
}
.wrapper .page5{
    display:block;
}
.wrapper .page5 .wrap_contents{
    margin-left:4vw;
    margin-right:4vw;
    height:100%;
}
.wrapper .page5 .wrap_p{
    font-size: 1.8vw;
    padding-top:1vw;
}
.wrapper .page5 .wrap_contents .content1{
    text-align : left;
}
.wrapper .page5 .wrap_contents .content1 .p_content{
    margin-top:1vw;
    margin-bottom:1vw;
}
.wrapper .page5 .wrap_contents .content1 .p_content p{
    font-size: 1.4vw;
    margin-top:1vw;
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

.contents {
    user-select: none;
}
.wrapper .title h1{
    user-select : none;
    font-size: 3vw;
}

</style>