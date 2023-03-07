# Server Response
SERVER_RESPONSE.MD에는 서버가 클라이언트에 응답을 보내는 Response 대한 정보가 포함되어 있습니다.

<br>

## Response 종류
각 Response는 /common/socket-constants.js에 ResponseType 안에 정의되어 있습니다.

> **사용자 관리 응답**
> - [RES_ADD_USER_TO_LIST](#res_add_user_to_list): 서버 접속 목록에 사용자 추가에 대한 응답
> <br>
>
> **LOBBY 참여 및 퇴장 응답**
> - [RES_JOIN_LOBBY](#res_join_lobby): Lobby 참여 응답
> <br>
>
> **목록 응답**
> - [RES_ROOM_LIST](#res_room_list): 개설된 사용자 설정 게임방 목록 반환
> - [RES_ONLINE_LIST](#res_online_list): 현재 접속중인 사용자 목록 반환
> <br>
>
> **게임방**
> - [RES_GET_ROOM_RID](#res_get_room_rid): 새로운 게임방에 대한 방 정보 반환
> - [RES_PLAYER_JOIN](#res_player_join): 다른 유저 접속에 대한 응답 반환
> - [RES_JOIN_ROOM](#res_join_room): 게임방 참여 응답 반환
> - [RES_PLAYER_LEAVE](#res_player_leave): 게임방 퇴장에 대한 응답 반환
> - [RES_PLAYER_READY](#res_player_ready): 사용자 게임 준비에 대한 응답 반환
> - [RES_PLAYER_NOT_READY](#res_player_not_ready): 사용자 게임 준비 취소에 대한 응답 반환
> - [RES_GAME_START](#res_player_ready): 사용자 게임 시작에 대한 응답 반환
> <br
>
> **게임**
> - [RES_ROUND_START](#res_round_start): 게임 라운드 시작에 대한 응답 반환
> - [RES_SPREAD_CARD](#res_spread_card): 게임 라운드 시작 시 시작 카드 반환
> - [RES_GET_CARD](#res_get_card): 카드 한장 뽑았을 때 카드 반환
> - [RES_GET_CARDS](#res_get_card): 카드 갱신 시 카드 정보 전체 반환 <!--추후 없어질 예정-->
> - [RES_DRAW_CARD](#res_draw_card): 버린 카드에 대한 정보 반환
> - [RES_CHANGE_TURN](#res_change_turn): 턴 전환에 대한 응답 반환
> - [RES_BBONG](#res_bbong): 플레이어가 뽕을 했을 경우에 대한 정보 반환
> - [RES_NATURE_BBONG](#res_nature_bbong): 플레이어가 자연을 했을 경우에 대한 정보 반환
> - [RES_OVER_PRICE](#res_over_price): 플레이어가 바가지에 걸렸을 경우에 대한 정보 반환
> - [RES_STOP](#res_stop): 플레이어가 스톱을 했을 경우 응답 반환
> - [RES_GAME_END](#res_game_end): 라운드가 끝났을 경우 응답 반환
> <br>
>
> **채팅**
> - [BROADCAST_LOBBY_MSG](#broadcast_lobby_msg): Lobby로 전체채팅 메세지 전송
> - [BROADCAST_ROOM_MSG](#broadcast_room_msg): 게임방으로 채팅 메세지 전송

<br>

## Response 데이터
각각의 Response를 통해 전달되는 데이터가 구체적으로 설명되어 있습니다.<br>
Game Room에 대한 정보는 {roomdata}를 이용하여 계속 갱신하고 있습니다.

<br>

### 사용자 관리 응답
#### RES_ADD_USER_TO_LIST
- 서버 접속 목록에 사용자 추가에 대한 응답
```
{
    none
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
    cards : [
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

#### RES_NATURE_BBONG
- 플레이어가 자연을 했을 경우에 대한 정보 반환
```
{
    nickname : 'Nickname',
    cards : [
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
