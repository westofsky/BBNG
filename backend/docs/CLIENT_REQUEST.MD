# Client Request
CLIENT_REQUEST.MD에는 클라이언트가 서버에 요청을 보내는 Request에 대한 정보가 포함되어 있습니다.

<br>

## Request 종류
각 Request는 /common/socket-constants.js에 RequestType 안에 정의되어 있습니다.

> **사용자 관리 요청**
> - [ADD_USER_TO_LIST](#add_user_to_list): 서버 접속 목록에 사용자 추가
> <br>
>
> **LOBBY 참여 및 퇴장 요청**
> - [JOIN_LOBBY](#join_lobby): Lobby 참여
> - [LEAVE_LOBBY](#leave_lobby): Lobby 퇴장(ex. 게임방 이동 시)
> <br>
>
> **목록 요청**
> - [ROOM_LIST](#room_list): 개설된 사용자 설정 게임방 목록
> - [GET_ONLINE_LIST](#get_online_list): 현재 접속 중인 사용자 목록
> <br>
>
> **게임방**
> - [CREATE_ROOM](#creat_room): 새로운 게임방 생성
> - [DESTROY_ROOM](#destroy_room): 생성된 게임방 제거
> - [JOIN_ROOM](#join_room): 게임방 참여
> - [LEAVE_ROOM](#leave_room): 게임방 퇴장
> - [READY](#ready): 준비
> - [NOT_READY](#not_ready): 준비해제
> <br>
>
> **대기열**
> - [JOIN_NORMAL_QUEUE](#join_normal_queue): 일반게임 대기열 참가
> - [LEAVE_NORMAL_QUEUE](#leave_normal_queue): 일반게임 대기열 퇴장
> - [ACCEPT_NORMAL_QUEUE](#accept_normal_queue): 일반게임 수락
> - [REJECT_NORMAL_QUEUE](#reject_normal_queue): 일반게임 거절
> - [JOIN_RANK_QUEUE](#join_rank_queue): 랭크게임 대기열 참가
> - [LEAVE_RANK_QUEUE](#leave_rank_queue): 랭크게임 대기열 퇴장
> - [ACCEPT_RANK_QUEUE](#accept_rank_queue): 랭크게임 수락
> - [REJECT_RANK_QUEUE](#reject_rank_queue): 랭크게임 거절
> <br>
>
> **게임**
> - [GET_CARD](#get_card): 카드 한장 요청
> - [DRAW_CARD](#draw_card): 카드 한장 제출
> - [BBONG](#bbong): 뽕
> - [DRAW_BBONG_CARD](#draw_bbong_card): 뽕에 해당되는 카드와 함께 버릴 카드 한장 제출
> - [NATURE](#nature): 자연
> - [DRAW_NATURE_CARD](#draw_nature_card): 자연에 해당되는 카드와 함께 버릴 카드 한장 제출
> - [STOP](#stop): 스톱(라운드 종료)
> - [OVER_PRICE](#over_price): 바가지
> <br>
>
> **채팅**
> - [SEND_MSG_TO_LOBBY](#send_msg_to_lobby): Lobby로 전체채팅 메세지 전송
> - [SEND_MSG_TO_ROOM](#send_msg_to_room): 게임방으로 채팅 메세지 전송

<br>

## Request 데이터
각각의 Request를 통해 전달되는 데이터가 구체적으로 설명되어 있습니다.

<br>

### 사용자 관리 요청
#### ADD_USER_TO_LIST
- 서버 접속 목록에 사용자 추가
```
{
    nickname: 'Nickname'
}
```
<br>

### Lobby 참여 및 퇴장 요청
#### JOIN_LOBBY
- Lobby 참여
```
{
    none
}
```
<br>

#### LEAVE_LOBBY
- Lobby 퇴장(ex. 게임방 이동 시)
```
{
    none
}
```
<br>

### 목록 요청
#### ROOM_LIST
- 개설된 사용자 설정 게임방 목록
```
{
    none
}
```
<br>

#### GET_ONLINE_LIST
- 현재 접속 중인 사용자 목록
```
{
    none
}
```
<br>

### 게임방
#### CREATE_ROOM
- 새로운 게임방 생성
```
{
    rid: 'Room ID',
    host: 'Nickname',
    password: 'Room Password',
    player_limit: 0,
    current_player_count: 0,
    show_score: true,
    round_count: 0,
    ready_count: 0,
    state: 0(GameState.WAITING),
    players: ['Nickname']
}
```
<br>

#### DESTROY_ROOM
- 생성된 게임방 제거
```
{
    rid: 'Room ID'
}
```
<br>

#### JOIN_ROOM
- 게임방 참여
```
{
    rid: 'Room ID',
    nickname: 'Nickname',
    password: 'Room Password'
}
```
<br>

#### LEAVE_ROOM
- 게임방 퇴장
```
{
    rid: 'Room ID',
    nickname: 'Nickname'
}
```
<br>

#### READY
- 준비
```
{
    rid: 'Room ID',
    nickname: 'Nickname'
}
```
<br>

#### NOT_READY
- 준비해제
```
{
    rid: 'Room ID',
    nickname: 'Nickname'
}
```
<br>

### 대기열
#### JOIN_NORMAL_QUEUE
- 일반게임 대기열 참가
```
{
    nickname: 'Nickname'
}
```
<br>

#### LEAVE_NORMAL_QUEUE
- 일반게임 대기열 퇴장
```
{
    nickname: 'Nickname'
}
```
<br>

#### ACCEPT_NORMAL_QUEUE
- 일반게임 수락
```
{
    qid: 'Normal Queue ID',
    nickname: 'Nickname'
}
```
<br>

#### REJECT_NORMAL_QUEUE
- 일반게임 거절
```
{
    qid: 'Normal Queue ID',
    nickname: 'Nickname'
}
```
<br>

#### JOIN_RANK_QUEUE
- 랭크게임 대기열 참가
```
{
    nickname: 'Nickname'
}
```
<br>

#### LEAVE_RANK_QUEUE
- 랭크게임 대기열 퇴장
```
{
    nickname: 'Nickname'
}
```
<br>

#### ACCEPT_RANK_QUEUE
- 랭크게임 수락
```
{
    qid: 'Rank Queue ID',
    nickname: 'Nickname'
}
```
<br>

#### REJECT_RANK_QUEUE
- 랭크게임 거절
```
{
    qid: 'Rank Queue ID',
    nickname: 'Nickname'
}
```
<br>

### 게임
#### GET_CARD
- 카드 한장 요청
```
{
    rid: 'Room ID',
    nickname: 'Nickname'
}
```
<br>

#### DRAW_CARD
- 카드 한장 제출
```
{
    rid: 'Room ID',
    nickname: 'Nickname',
    card: {
        draw_card: 'Card Type',
        x: 0,
        y: 0
    },
    over_price: 0
}
```
<br>

#### BBONG
- 뽕
```
{
    rid: 'Room ID',
    nickname: 'Nickname'
}
```
<br>

#### DRAW_BBONG_CARD
- 뽕에 해당되는 카드와 함께 버릴 카드 한장 제출
```
{
    rid: 'Room ID',
    nickname: 'Nickname',
    bbong_cards: [
        {
            draw_card: 'Card Type',
            x: 0,
            y: 0 
        },
        {
            draw_card: 'Card Type',
            x: 0,
            y: 0
        }
    ],
    card: {
        draw_card: 'Card Type',
        x: 0,
        y: 0
    }
}
```
<br>

#### NATURE
- 자연
```
{
    rid: 'Room ID',
    nickname: 'Nickname'
}
```
<br>


#### DRAW_NATURE_CARD
- 자연에 해당되는 카드와 함께 버릴 카드 한장 제출
```
{
    rid: 'Room ID',
    nickname: 'Nickname',
    bbong_cards: [
        {
            draw_card: 'Card Type',
            x: 0,
            y: 0 
        },
        {
            draw_card: 'Card Type',
            x: 0,
            y: 0
        }
    ],
    card: {
        draw_card: 'Card Type',
        x: 0,
        y: 0
    }
}
```
<br>

#### STOP
- 스톱
```
{
    
}
```
<br>

#### OVER_PRICE
- 바가지
```
{
    rid: 'Room ID',
    nickname: 'Nickname'
}
```
<br>

### 채팅
#### SEND_MSG_TO_LOBBY
- Lobby로 전체 채팅 메세지 전송
```
{
    rid: none,
    nickname: 'Nickname',
    message: 'Message'
}
```
<br>

#### SEND_MSG_TO_ROOM
- 게임방으로 채팅 메세지 전송
```
{
    rid: 'Room ID',
    nickname: 'Nickname',
    message: 'Message'
}
```
<br>
