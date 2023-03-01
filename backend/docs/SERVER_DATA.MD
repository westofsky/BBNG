# Server Data

SERVER_DATA.MD에는 서버에서 필요한 데이터들에 대해 정의되어 있습니다.

<br>

## 게임방 정보 (Type: Map)

게임방 정보는 유저가 직접 생성한 사설 게임방에 대한 정보를 가지고 있습니다. 각 방에 대한 정보는 해당 방의 고유 ID를 Key로, 방의 정보를 Value로 가지고 있는 Map의 형태로 저장되어 있습니다.

<br>

```json
let gameRoomList = {
    {
        'Room ID': {
            rid: '',                                        // 게임방 고유 ID
            host: '',                                       // 방장 닉네임
            name: '',                                       // 방 이름
            password: '',                                   // 방 비밀번호
            player_limit: 0,                                // 게임 진행을 위한 인원 수
            current_player_count: 0,                        // 현재 방에 참여하고 있는 인원 수
            show_score: true,                               // 게임 진행 중 점수 표시 여부
            round_count: 0,                                 // 진행 라운드 수
            ready_count: 0,                                 // 준비완료한 플레이어 수
            state: GameState.WAITING / GameState.PLAYING,   // 현재 게임 진행 상태
            players: [                                      // 현재 방에 참여하고 있는 플레이어 목록
                {
                    socket_id: '',                          // 플레이어가 사용중인 Socket ID
                    oid: '',                                // MongoDB 사용자별 고유 OID
                    nickname: ''                            // 플레이어 닉네임
                },
                ...
            ],
            game_data: {                                    // 게임 진행 중 사용되는 데이터
                ...
            }
        },
        ...
    }
}
```

<br><br>

## 게임 정보 (Type: Map)
게임 정보는 게임 진행 중 필요한 정보들을 담고 있으며, 새로운 게임이 시작될 때마다 초기화됩니다. 게임 정보는 해당 게임이 진행되고 있는 게임방 데이터에 game_data로 정의되어있습니다.

<br>

```json
let gameRoomList = {
    'Room ID': {
        ...
        game_data: {
            current_round: 0,                           // 현재 라운드
            current_player: ,                           // 현재 차례 플레이어
            players_data: {                             // 플레이어별 게임 정보
                'nickname': {                           // 플레이어 닉네임
                    turn_count: 0,                      // 플레이어의 턴 진행 횟수
                    cards: [                            // 플레이어가 가지고 있는 카드 목록
                        'C1', 'C2', ...
                    ],
                    state: 0,                           // 플레이어 상태 (0: 기본, 1: 뽕, 2: 바가지)
                    over_price: 0                       // 플레이어의 바가지 카드 번호
                },
                ...
            },
            deck: [                                     // 뽑을 수 있는 카드 목록
                'D1', 'D2', 'D3', ...
            ],
            pushed_deck: {                              // 바닥에 깔려있는 카드 목록
                'S1': {                                 // 카드 종류 및 번호
                    x: 0,                               // 카드가 놓여있는 X 좌표
                    y: 0,                               // 카드가 놓여있는 Y 좌표
                }
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
            message_key: ''                             // 클라이언트의 Request 요청 유효여부 확인용 Key
        }
    }
}

```
