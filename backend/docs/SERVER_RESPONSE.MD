# Server Response
SERVER_RESPONSE.MD에는 서버가 클라이언트에게 응답하는 Response에 대한 정보가 포함되어 있습니다.

<br>

## Response 종류
각 Response는 /common/socket-constants.js에 ResponseType 안에 정의되어 있습니다.

> **사용자 관리**
> - [RES_ADD_USER_TO_LIST](#res_add_user_to_list): 서버 접속 목록에 사용자 추가
> <br>
>
> **LOBBY**
> - [RES_JOIN_LOBBY](#res_join_lobby): Lobby 참여 응답
> <br>
>
> **목록**
> - [RES_ROOM_LIST](#res_room_list): 개설된 사용자 설정 게임방 목록 반환
> - [RES_ONLINE_LIST](#res_online_list): 현재 접속 중인 사용자 목록 반환
> <br>
>
> **게임방**
> - [RES_CREATE_ROOM](#res_create_room): 새로운 게임방 생성 응답
> - [RES_JOIN_ROOM](#res_join_room): 게임방 참여 결과
> - [RES_PLAYER_JOIN](#res_player_join): 다른 플레이어 참여
> - [RES_PLAYER_LEAVE](#res_player_leave): 다른 플레이어 퇴장
> - [RES_PLAYER_READY](#res_ready): 다른 플레이어 준비
> - [RES_PLAYER_NOT_READY](#not_ready): 다른 플레이어 준비해제
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
> - [RES_GAME_END](#res_game_end): 게임 종료 알림
> - [RES_ROUND_START](#res_round_start): 라운드 시작 알림
> - [RES_ROUND_END](#res_round_end): 라운드 종료 알림
> - [RES_CHANGE_TURN](#res_change_turn): 턴 변경 알림
> - [RES_SPREAD_CARD](#res_spread_card): 무작위로 뽑은 카드 5장 묶음들을 각 플레이어에게 전달
> - [RES_GET_CARD](#res_get_card): 덱에서 뽑은 카드 전달
> - [RES_DRAW_CARD](#res_draw_card): 플레이어가 내려놓은 카드 정보 전달
> - [RES_BBONG](#res_bbong): 뽕 이벤트 발생 알림
> - [RES_DRAW_BBONG_CARD](#res_draw_bbong_card): 플레이어가 내려놓은 뽕에 해당되는 카드와 함께 버린 카드, 바가지 여부 반환
> - [RES_NATURE](#res_nature): 플레이어가 내려놓은 자연에 해당되는 카드와 함께 버린 카드, 바가지 여부 반환
> <br>
>
> **채팅**
> - [BROADCAST_LOBBY_MSG](#broadcast_lobby_msg): Lobby 채팅 메세지 브로드캐스트
> - [BROADCAST_ROOM_MSG](#broadcast_room_msg): 게임방 채팅 메세지 브로드캐스트

<br>

## Response 데이터
각각의 Response를 통해 전달되는 데이터가 구체적으로 설명되어 있습니다.

<br>

### 사용자 관리
#### RES_ADD_USER_TO_LIST
- 서버 접속 목록에 사용자 추가
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
    'Room ID': {
        rid: 'Room ID',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname', ...]
        password_required: true/false
    },
    ...
}
```
<br>

#### RES_ONLINE_LIST
- 현재 접속 중인 사용자 목록 반환
```
{
    ['Nickname', ...]
}
```
<br>

### 게임방
#### RES_CREATE_ROOM
- 새로운 게임방 생성 응답
```
{
    room_data : {
        rid: 'Room ID',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname', ...]
    },
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            }
        },
        pushed_deck: {},
        rounds_result: []
    }
}

```
<br>

#### RES_JOIN_ROOM
- 게임방 참여 결과
```
{
    result : ResponseResult.RES_JOIN_ROOM_SUCCESS / ResponseResult.RES_JOIN_ROOM_FAILED_WRONG_PASSWORD / ResponseResult.RES_JOIN_ROOM_FAILED_ROOM_FULL / ResponseResult.RES_JOIN_ROOM_FAILED_NOT_EXIST,
    room_data : {
        rid: 'Room ID',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname', ...]
    },
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {},
        rounds_result: []
    }
}
```
<br>

#### RES_PLAYER_JOIN
- 다른 플레이어 참여
```
{
    nickname : 'Nickname',
    room_data : {
        rid: 'Room ID',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname', ...]
    },
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {},
        rounds_result: []
    }
}
```
<br>

#### RES_PLAYER_LEAVE
- 다른 플레이어 퇴장
```
{
    nickname : 'Nickname',
    room_data : {
        rid: 'Room ID',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname', ...]
    } ,
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {},
        rounds_result: []
    }
}
```
<br>


#### RES_PLAYER_READY
- 다른 플레이어 준비
```
{
    nickname : 'Nickname',
    room_data : {
        rid: 'Room ID',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname', ...]
    } 
}
```
<br>

#### RES_PLAYER_NOT_READY
- 다른 플레이어 준비해제
```
{
    nickname : 'Nickname',
    room_data : {
        rid: 'Room ID',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname', ...]
    } 
}
```
<br>
### 대기열
#### RES_JOIN_NORMAL_QUEUE
- 일반게임 대기열 참가
```
{

}
```
<br>

#### RES_ACCEPT_NORMAL_QUEUE
- 일반게임 수락
```
{

}
```
<br>

#### RES_JOIN_RANK_QUEUE
- 랭크게임 대기열 참가
```
{

}
```
<br>

#### RES_ACCEPT_RANK_QUEUE
- 랭크게임 수락
```
{

}
```
<br>

### 게임
#### RES_GAME_START
- 게임 시작 알림
```
{
    room_data : {
        rid: 'Roomid',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true/false,
        round_count: 0,
        ready_count: 0,
        state: GameState.PLAYING,
        players: ['Nickname', ...]
    },
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {},
        rounds_result: []
    }
}
```
<br>

#### RES_GAME_END
- 게임 종료 알림
```
{
    winner: 'Nickname',
    room_data : {
        rid: 'Room ID',
        host: 'Nickname',
        name: 'Roomname',
        player_limit: 0,
        current_player_count: 0,
        show_score: true,
        round_count: 0,
        ready_count: 0,
        state: 0,
        players: ['Nickname', ...]
    } ,
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {},
        rounds_result: []
    }
}
```
<br>

#### RES_ROUND_START
- 라운드 시작 알림
```
{
    player_turn : 'Nickname',
    round : 0,
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            }
        },
        pushed_deck: {},
        rounds_result: [
            {
                round: 0,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

#### RES_ROUND_END
- 라운드 종료 알림
```
{
    winner: 'Nickname',
    type: GameEndType.TYPE_222 / GameEndType.TYPE_33 / GameEndType.TYPE_42 / GameEndType.TYPE_LOW / GameEndType.TYPE_HIGH / GameEndType.TYPE_STRAIGHT / GameEndType.TYPE_OVER_PRICE / GameEndType.TYPE_BBONG_LOW / GameEndType.TYPE_BBONG_NATURE,
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {
            'S1': {
                x: 0,
                y: 0,
            },
            ...
        },
        rounds_result: [
            {
                round: 1,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

#### RES_CHANGE_TURN
- 턴 변경 알림
```
{
    nickname : 'Nickname',
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {
            'S1': {
                x: 0,
                y: 0,
            },
            ...
        },
        rounds_result: [
            {
                round: 1,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

#### RES_SPREAD_CARD
- 무작위로 뽑은 카드 5장 묶음들을 각 플레이어에게 전달
```
{
    cards : ['Card Type','Card Type','Card Type','Card Type','Card Type'],
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {
            'S1': {
                x: 0,
                y: 0,
            },
            ...
        },
        rounds_result: [
            {
                round: 1,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

#### RES_GET_CARD
- 덱에서 뽑은 카드 전달
```
{
    card : 'Card Type',
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {
            'S1': {
                x: 0,
                y: 0,
            },
            ...
        },
        rounds_result: [
            {
                round: 1,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

#### RES_DRAW_CARD
- 플레이어가 내려놓은 카드 정보 전달
```
{
    nickname : 'Nickname',
    draw_card: {
        card: 'Card Type',
        x: 0,
        y: 0
    },
    over_price : 0,
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {
            'S1': {
                x: 0,
                y: 0,
            },
            ...
        },
        rounds_result: [
            {
                round: 1,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

#### RES_BBONG
- 뽕 이벤트 발생 알림
```
{
    nickname : 'Nickname',
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {
            'S1': {
                x: 0,
                y: 0,
            },
            ...
        },
        rounds_result: [
            {
                round: 1,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

#### RES_DRAW_BBONG_CARD
- 플레이어가 내려놓은 뽕에 해당되는 카드와 함께 버린 카드, 바가지 여부 반환
```
{
    nickname : 'Nickname',
    bbong_cards : [
        {
            card: 'Card Type',
            x: 0,
            y: 0 
        },
        {
            card: 'Card Type',
            x: 0,
            y: 0
        }
    ],
    draw_card: {
        card: 'Card Type',
        x: 0,
        y: 0
    },
    over_price : 0,
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {
            'S1': {
                x: 0,
                y: 0,
            },
            ...
        },
        rounds_result: [
            {
                round: 1,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

#### RES_NATURE
- 플레이어가 내려놓은 자연에 해당되는 카드와 함께 버린 카드, 바가지 여부 반환
```
{
    nickname : 'Nickname',
    nature_cards : [
        {
            card: 'Card Type',
            x: 0,
            y: 0 
        },
        {
            card: 'Card Type',
            x: 0,
            y: 0
        },
        {
            card: 'Card Type',
            x: 0,
            y: 0
        }
    ],
    draw_card: {
        card: 'Card Type',
        x: 0,
        y: 0
    },
    over_price : 0,
    game_data: {
        current_round: 0,
        players_data: {
            'Nickname': {
                turn_count: 0,
                card_count: 0,
                state: 0
            },
            ...
        },
        pushed_deck: {
            'S1': {
                x: 0,
                y: 0,
            },
            ...
        },
        rounds_result: [
            {
                round: 1,
                players_score: {
                    'Nickname': 0,
                    ...
                }
            },
            ...
        ]
    }
}
```
<br>

### 채팅
#### BROADCAST_LOBBY_MSG
- Lobby 채팅 메세지 브로드캐스트
```
{
    rid: none,
    nickname: 'Nickname',
    message: 'Message'
}
```
<br>

#### BROADCAST_ROOM_MSG
- 게임방 채팅 메세지 브로드캐스트
```
{
    rid: 'Room ID',
    nickname: 'Nickname',
    message: 'Message'
}
```
<br>
