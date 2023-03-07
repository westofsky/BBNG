# Server Response
SERVER_RESPONSE.MD에는 서버가 클라이언트에게 응답하는 Response에 대한 정보가 포함되어 있습니다.

<br>

## Response 종류
각 Response는 /common/socket-constants.js에 ResponseType 안에 정의되어 있습니다.

> **사용자 관리**
> - [RES_ADD_USER_TO_LIST](#res_add_user_to_list): 서버 접속 목록에 사용자 추가
> <br>
>
> **LOBBY 참여 및 퇴장**
> - [RES_JOIN_LOBBY](#res_join_lobby): Lobby 참여
> <br>
>
> **목록**
> - [RES_ROOM_LIST](#res_room_list): 개설된 사용자 설정 게임방 목록
> - [RES_ONLINE_LIST](#res_online_list): 현재 접속 중인 사용자 목록
> <br>
>
> **게임방**
> - [RES_CREATE_ROOM](#res_creat_room): 새로운 게임방 생성
> - [RES_JOIN_ROOM](#res_join_room): 게임방 참여
> - [RES_PLAYER_READY](#res_ready): 준비
> - [RES_PLAYER_NOT_READY](#not_ready): 준비해제
> - [RES_PLAYER_JOIN](#res_player_join): 다른 플레이어 참여
> - [RES_PLAYER_LEAVE](#res_player_leave): 다른 플레이어 퇴장
> <br>
>
> **대기열**
> - [RES_JOIN_NORMAL_QUEUE](#res_join_normal_queue): 일반게임 대기열 참가
> - [RES_ACCEPT_NORMAL_QUEUE](#res_accept_normal_queue): 일반게임 수락
> - [RES_JOIN_RANK_QUEUE](#res_join_rank_queue): 랭크게임 대기열 참가
> - [RES_ACCEPT_RANK_QUEUE](#res_accept_rank_queue): 랭크게임 수락
> <br>
>
> **게임**
> - [RES_GAME_START](#res_game_start): 게임 시작 알림
> - [RES_ROUND_START](#res_round_start): 라운드 시작 알림
> - [RES_ROUND_END](#res_round_end): 라운드 종료 알림
> - [RES_SPREAD_CARD](#res_spread_card): 무작위로 뽑은 카드 5장 묶음들을 각 플레이어에게 전달
> - [RES_GET_CARD](#res_get_card): 덱에서 뽑은 카드 전달
> - [RES_DRAW_CARD](#res_draw_card): 플레이어가 내려놓은 카드 정보 전달
> - [RES_BBONG](#res_bbong): 뽕 이벤트 발생 알림
> - [RES_DRAW_BBONG_CARD](#res_draw_bbong_card): 플레이어가 뽕 상태에서 버린 카드 전달
> - [RES_NATURE](#res_nature): 자연 이벤트 발생 알림
> - [RES_DRAW_NATURE_CARD](#res_draw_nature_card): 플레이어가 자연 상태에서 버린 카드 전달
> - [RES_ROUND_END](#res_round_end): 스톱(라운드 종료)
> - [RES_GAME_END](#res_game_end): 게임 종료 알림
> <br>
>
> **채팅**
> - [RES_SEND_MSG_TO_LOBBY](#res_send_msg_to_lobby): Lobby로 전체채팅 메세지 전송
> - [RES_SEND_MSG_TO_ROOM](#res_send_msg_to_room): 게임방으로 채팅 메세지 전송

<br>

## Response 데이터
각각의 Response를 통해 전달되는 데이터가 구체적으로 설명되어 있습니다.

<br>

### 사용자 관리
#### ADD_USER_TO_LIST
- 서버 접속 목록에 사용자 추가
```
{
    nickname: 'Nickname'
}
```
<br>

### Lobby 참여 및 퇴장 응답
#### RES_JOIN_LOBBY
- Lobby 참여 응답
```
{
    none
}
```
<br>

### 목록 응답
#### RES_ROOM_LIST
- 개설된 사용자 설정 게임방 목록 반환
```
{
    'Room id': {
        id: 'Room id',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        game_data: {
            ready_count: 0,
            current_round: 0,
            current_player: 0,
            player: [],
            deck: [],
            push_deck: [],
            round_result: [],
            message_key: ''
        },
        password_required: true
    },
}
```
<br>

#### RES_ONLINE_LIST
- 현재 접속 중인 사용자 목록 반환
```
{
    ['Nickname']
}
```
<br>

### 게임방
#### RES_GET_ROOM_RID
- 새로운 게임방에 대한 방 정보 반환
```
{
    roomdata : {
        rid: 'Roomid',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname']
    }
}
```
<br>

#### RES_PLAYER_JOIN
- 다른 유저 접속에 대한 응답 반환
```
{
    nickname : 'Nickname',
    roomdata : {
        rid: 'Roomid',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname']
    } 
}
```
<br>

#### RES_JOIN_ROOM
- 게임방 참여 응답 반환
```
{
    result : 0
}
```
<br>

#### RES_PLAYER_LEAVE
- 게임방 퇴장에 대한 응답 반환
```
{
    nickname : 'Nickname',
    roomdata : {
        rid: 'Roomid',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname']
    } 
}
```
<br>

#### RES_PLAYER_READY
- 사용자 게임 준비에 대한 응답 반환
```
{
    nickname : 'Nickname',
    roomdata : {
        rid: 'Roomid',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname']
    } 
}
```
<br>

#### RES_PLAYER_NOT_READY
- 사용자 게임 준비 취소에 대한 응답 반환
```
{
    nickname : 'Nickname',
    roomdata : {
        rid: 'Roomid',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname']
    }
}
```
<br>

#### RES_GAME_START
- 사용자 게임 시작에 대한 응답 반환
```
{
    nickname : 'Nickname',
    roomdata : {
        rid: 'Roomid',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname']
    }
}
```
<br>

### 게임
#### RES_ROUND_START
- 게임 라운드 시작에 대한 응답 반환
```
{
    player_turn : 'Nickname',
    round : 1
}
```
<br>

#### RES_SPREAD_CARD
- 게임 라운드 시작 시 시작 카드 반환
```
{
    cards : ['Card Type','Card Type','Card Type','Card Type','Card Type']
}
```
<br>

#### RES_GET_CARD
- 카드 한장 뽑았을 때 카드 반환
```
{
    card : 'Card Type'
}
```
<br>

#### RES_GET_CARDS
- 카드 갱신 시 카드 정보 전체 반환
```
{
    players : 
}
```
<br>

#### RES_DRAW_CARD
- 버린 카드에 대한 정보 반환
```
{
    nickname : 'Nickname',
    over_price : 0,
    card: {
        draw_card: 'Card Type',
        x: 0,
        y: 0
    },
}
```
<br>

#### RES_CHANGE_TURN
- 턴 전환에 대한 응답 반환
```
{
    nickname : 'Nickname'
}
```
<br>

#### RES_BBONG
- 플레이어가 뽕을 했을 경우에 대한 정보 반환
```
{
    nickname : 'Nickname',
}
```
<br>

#### RES_DRAW_BBONG_CARD
- 뽕 로직 처리 후 정보 반환
```
{
    nickname : 'Nickname',
    bbong_cards : [
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
    draw_card: {
        draw_card: 'Card Type',
        x: 0,
        y: 0
    },
    over_price : 0
}
```
<br>

#### RES_NATURE
- 플레이어가 자연을 했을 경우에 대한 응답 반환
```
{
    nickname : 'Nickname',
}
```
<br>

#### RES_DRAW_NATURE
- 자연 로직 처리 후 정보 반환
```
{
    nickname : 'Nickname',
    nature_cards : [
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
    draw_card: {
        draw_card: 'Card Type',
        x: 0,
        y: 0
    },
    over_price : 0
}
```
<br>

#### RES_OVER_PRICE
- 플레이어가 바가지에 걸렸을 경우에 대한 정보 반환
```
{
    nickname : 'Nickname',
    round : 0,
    player_score : [0,0,0]
}
```
<br>

#### RES_STOP
- 플레이어가 스톱을 했을 경우 응답 반환
```
{
    nickname : 'Nickname',
    round : 0,
    player_score : [0,0,0]
}
```
<br>

#### RES_GAME_END
- 라운드가 끝났을 경우 응답 반환
```
{
    none
}
```

### 채팅
#### BROADCAST_LOBBY_MSG
- Lobby로 전체채팅 메세지 전송
```
{
    rid: none,
    nickname: 'Nickname',
    message: 'Message'
}
```
<br>

#### BROADCAST_ROOM_MSG
- 게임방으로 채팅 메세지 전송
```
{
    rid: 'Room ID',
    nickname: 'Nickname',
    message: 'Message'
}
```
<br>
