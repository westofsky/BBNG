# Server Response
SERVER_RESPONSE.MD에는 서버가 클라이언트에게 응답하는 Response에 대한 정보가 포함되어 있습니다.

<br>

## Response 종류
각 Request는 /common/socket-constants.js에 ResponseType 안에 정의되어 있습니다.

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

