# Client Request

CLIENT_REQUEST.MD에는 클라이언트가 서버에 요청을 보내는 Request에 대한 정보가 포함되어 있습니다.

<br>

## Request 종류
각 Request는 /common/socket-constants.js에 RequestType 안에 정의되어 있습니다.

```json
const RequestType = {
    // 사용자 관리
    ADD_USER_TO_LIST: 0,    // 사용자를 서버 접속 목록에 추가

    // Lobby 참여 및 탈퇴 요청
    JOIN_LOBBY: 0,          // Lobby 참여
    LEAVE_LOBBY: 0,         // Lobby 탈퇴(ex. 게임방 접속)

    // 친구
    ADD_FRIEND: 0,          // 친구 추가
    DELETE_FRIEND: 0,       // 친구 삭제
    INVITE_FRIEND: 0,       // 친구 요청 목록
    ACCEPT_INVITE: 0,       // 친구 요청 수락

    // 특정 목록
    ROOM_LIST: 0,           // 개설된 사용자 설정 게임방 목록
    GET_ONLINE_LIST : 0,    // 현재 접속 중인 사용자 목록

    // 게임방
    CREATE_ROOM: 0,         // 새로운 게임방 생성
    DESTROY_ROOM: 0,        // 생성된 게임방 제거
    JOIN_ROOM: 0,           // 게임방 참여
    LEAVE_ROOM: 0,          // 게임방 탈퇴
    READY: 0,               // 준비
    NOT_READY: 0,           // 준비해제

    // 대기열
    JOIN_NORMAL_QUEUE: 0,   // 일반게임 대기열 참가
    LEAVE_NORMAL_QUEUE: 0,  // 일반게임 대기열 탈퇴
    ACCEPT_NORMAL_QUEUE: 0, // 일반게임 수락
    REJECT_NORMAL_QUEUE: 0, // 일반게임 거절
    JOIN_RANK_QUEUE: 0,     // 랭크게임 대기열 참가
    LEAVE_RANK_QUEUE: 0,    // 랭크게임 대기열 탈퇴
    ACCEPT_RANK_QUEUE: 0,   // 랭크게임 수락
    REJECT_RANK_QUEUE: 0,   // 랭크게임 거절

    // 게임
    GET_CARD: 0,            // 카드 한장 요청
    DRAW_CARD: 0,           // 카드 한장 제출
    BBONG: 0,               // 뽕
    NATURE_BBONG: 0,        // 자연
    STOP: 0,                // 스톱(게임 종료)
    OVER_PRICE: 0,          // 바가지

    // Chatting Event
    SEND_MSG_TO_LOBBY: 0,   // Lobby로 전체채팅 메세지 전송
    SEND_MSG_TO_ROOM: 0,    // 게임방으로 채팅 메세지 전송
}
```

- ADD_USER_TO_LIST
```json
data : {
    'test1'                 // 유저 닉네임
}
```
- JOIN_LOBBY
```json
data : {
    user : 'test1'          // 유저 닉네임
}
```
- LEAVE_LOBBY
```

```
- ADD_FRIEND
```
```
- DELETE_FRIEND
```
```
- INVITE_FRIEND
```
```
- ACCEPT_FRIEND
```
```
- ROOM_LIST
```
```
- GET_ONLINE_LIST
```
```
- CREATE_ROOM
```json
{
    rid: '',                                
    host: 'test',         
    name: '테스트방 이름',      
    password: '',                                       
    player_limit: 3,                               
    current_player_count: 1,
    show_score: true,
    round_count: 0,
    ready_count: 0,
    state: 0,
    players: [{
        socket_id: 'wwtGufs_ieAEEORWWAAAD',
        oid: 's_reijt4bia1',
        nickname: 'test1'
    }]
}
```
- DESTROY_ROOM
```
```
- JOIN_ROOM
```
{
    rid: '3ed00529062893aab92fe92d0d51ae7f',
    socket_id: 'wwtGufs_ieAEEORWWAAAD',
    oid: 's_reijt4bia1',
    nickname: 'test1',
    password: '',
}
```
- READY
```
{
    rid: '3ed00529062893aab92fe92d0d51ae7f',
    nickname: 'test1'
}
```
- NOT_READY
```
{
    rid: '3ed00529062893aab92fe92d0d51ae7f',
    nickname: 'test1'
}
```
- JOIN_NORMAL_QUEUE
```

```
- LEAVE_NORMAL_QUEUE
```

```
- ACCEPT_NORMAL_QUEUE
```

```
