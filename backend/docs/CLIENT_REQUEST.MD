# Client Request
---
CLIENT_REQUEST.MD에는 클라이언트가 서버에 요청을 보내는 Request에 대한 정보가 포함되어 있습니다.
<br>

## Request 종류
각 Request는 /common/socket-constants.js에 RequestType 안에 정의되어 있습니다.

> <br>
>
> **사용자 관리 요청**
> - [ADD_USER_TO_LIST](#add_user_to_list): 서버 접속 목록에 사용자 추가
> <br>
>
> **LOBBY 참여 및 탈퇴 요청**
> - [JOIN_LOBBY](#join_lobby): Lobby 참여
> - [LEAVE_LOBBY](#leave_lobby): Lobby 탈퇴(ex. 게임방 이동 시)
> <br>
>
> **친구 요청**
> - [ADD_FRIEND](#add_friend): 친구 추가
> - [DELETE_FRIEND](#delete_friend): 친구 삭제
> - [ACCEPT_INVITE](#accept_invite): 친구 요청 수락
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
> - [LEAVE_ROOM](#leave_room): 게임방 탈퇴
> - [READY](#ready): 준비
> - [NOT_READY](#not_ready): 준비해제
> <br>
>
> **대기열**
> - [JOIN_NORMAL_QUEUE](#join_normal_queue): 일반게임 대기열 참가
> - [LEAVE_NORMAL_QUEUE](#leave_normal_queue): 일반게임 대기열 탈퇴
> - [ACCEPT_NORMAL_QUEUE](#accept_normal_queue): 일반게임 수락
> - [REJECT_NORMAL_QUEUE](#reject_normal_queue): 일반게임 거절
> - [JOIN_RANK_QUEUE](#join_rank_queue): 랭크게임 대기열 참가
> - [LEAVE_RANK_QUEUE](#leave_rank_queue): 랭크게임 대기열 탈퇴
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
> <br>

<br>

---

## Request 데이터
각각의 Request를 통해 전달되는 데이터가 구체적으로 설명되어 있습니다.
<br>

### 사용자 관리 요청
#### ADD_USER_TO_LIST
서버 접속 목록에 사용자 추가
- 사용자가 서버에 로그인할 경우 해당 Request를 서버로 전송하며, 서버에서는 해당 사용자를 접속자 목록에 추가합니다.
```
{
    nickname: 'Player Nickname'
}
```
<br>

### Lobby 참여 및 탈퇴 요청
#### JOIN_LOBBY
- 사용자가 로비 화면에 접속할 경우, 해당 Request를 서버로 전송하며 서버에서는 해당 사용자를 로비 채팅방에 추가합니다.
```
{
    none
}
```
<br>

#### LEAVE_LOBBY
LOBBY 탈퇴(ex. 게임방 이동 시)
- 사용자가 로비 화면에서 나갈 경우(게임방 이동, 로그아웃), 해당 Request를 서버로 전송하며 서버에서는 해당 사용자를 로비 채팅방에서 탈퇴시킵니다.
```
{
    none
}
```
<br>

### 친구 요청
#### ADD_FRIEND
친구 추가
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### DELETE_FRIEND
친구 삭제
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### ACCEPT_INVITE
친구 요청 수락
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

### 목록 요청
#### ROOM_LIST
개설된 사용자 설정 게임방 목록
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### GET_ONLINE_LIST
현재 접속 중인 사용자 목록
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

### 게임방
#### CREATE_ROOM
새로운 게임방 생성
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### DESTROY_ROOM
생성된 게임방 제거
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### JOIN_ROOM
게임방 참여
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### LEAVE_ROOM
게임방 탈퇴
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### READY
준비
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### NOT_READY
준비해제
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

### 대기열
#### JOIN_NORMAL_QUEUE
일반게임 대기열 참가
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### LEAVE_NORMAL_QUEUE
일반게임 대기열 탈퇴
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### ACCEPT_NORMAL_QUEUE
일반게임 수락
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### REJECT_NORMAL_QUEUE
일반게임 거절
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### JOIN_RANK_QUEUE
랭크게임 대기열 참가
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### LEAVE_RANK_QUEUE
랭크게임 대기열 탈퇴
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### ACCEPT_RANK_QUEUE
랭크게임 수락
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### REJECT_RANK_QUEUE
랭크게임 거절
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

### 게임
#### GET_CARD
카드 한장 요청
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### DRAW_CARD
카드 한장 제출
- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### BBONG
뽕

- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### DRAW_BBONG_CARD
뽕에 해당되는 카드와 함께 버릴 카드 한장 제출

- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### NATURE
자연

- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>


#### DRAW_NATURE_CARD
자연에 해당되는 카드와 함께 버릴 카드 한장 제출

- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### STOP
스톱

- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### OVER_PRICE
바가지

- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

### 채팅
#### SEND_MSG_TO_LOBBY
Lobby로 전체 채팅 메세지 전송

- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>

#### SEND_MSG_TO_ROOM
게임방으로 채팅 메세지 전송

- 이곳은 해당 Request에 대한 설명을 작성하는 영역입니다.
```
{
    
}
```
<br>
