# Client Data

CLIENT_DATA.MD에는 게임방에 참여 후 게임 진행 중에 필요한 데이터들에 대해 정의되어 있습니다.

<br>

## 게임방 정보 (Type: Map)
게임방 정보는 게임방에 대한 정보를 가지고 있습니다. SERVER_DATA 내에 있는 게임방 정보 중 불필요한 정보를 제외한 정보들을 가지고 있습니다.

<br>

```
{
    'room_data': {
        rid: '',                                        // 게임방 고유 ID
        host: '',                                       // 방장 닉네임
        name: '',                                       // 방 이름
        player_limit: 0,                                // 게임 진행을 위한 인원 수
        current_player_count: 0,                        // 현재 방에 참여하고 있는 인원 수
        show_score: true,                               // 게임 진행 중 점수 표시 여부
        round_count: 0,                                 // 진행 라운드 수
        ready_count: 0,                                 // 준비완료한 플레이어 수
        state: GameState.WAITING / GameState.PLAYING,   // 현재 게임 진행 상태
        players: ['', ... ],                            // 현재 방에 참여하고 있는 플레이어 목록
    },
}    
```

<br><br>

## 게임 정보 (Type: Map)
게임 정보는 게임 진행 중 필요한 정보들을 담고 있으며, 새로운 게임이 시작될 때마다 초기화됩니다. 게임 정보 room_data와 별도로 동기화를 하기 때문에 서버와 다르게 room_data 안에 저장되지 않고 별도로 선언되어 관리합니다.

<br>

```
game_data: {
    current_round: 0,                           // 현재 라운드
    current_player: 'Nickname',                 // 현재 차례 플레이어
    players_data: {                             // 플레이어별 게임 정보
        'nickname': {                           // 플레이어 닉네임
            turn_count: 0,                      // 플레이어의 턴 진행 횟수
            card_count: 0,                      // 플레이어가 가지고 있는 카드 개수
            state: 0,                           // 플레이어 상태 (0: 기본, 1: 뽕, 2: 바가지)
        },
        ...
    },
    pushed_deck: {                              // 바닥에 깔려있는 카드 목록
        'S1': {                                 // 카드 종류 및 번호
            x: 0,                               // 카드가 놓여있는 X 좌표
            y: 0,                               // 카드가 놓여있는 Y 좌표
        },
        ...
    },
    rounds_result: [                            // 라운드 결과 목록
        {
            round: 1,                           // 라운드
            players_score: {                    // 플레이어별 점수 
                'nickname': 0,                  // 플레이어 점수
                ...
            }
        },
        ...
    ],
    player_data {                               // 각 플레이어의 정보
        player_deck : []                        // 플레이어가 현재 갖고 있는 카드    
    }
}

```