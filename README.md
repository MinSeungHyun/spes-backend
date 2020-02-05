# Spes Backend

## 사용되는 모델

1. User

   ```json
   {
     "_id": "objectID",
     "username": "string",
     "email": "string",
     "profile": "string"
   }
   ```

2. Post

   ```json
   {
     "_id": "objectID",
     "image": "string (link)",
     "content": "string",
     "author": "userID",
     "agreedUsers": ["userObjectId"],
     "agreed": true,
     "created": 12808048528
   }
   ```

   `agreed` : 동의 여부, 사용자에 따라 다르다.

3. Room
   ```json
   {
     "_id": "objectID",
     "title": "string",
     "goal": "string",
     "continuous": true,
     "finish": 12808048528,
     "finished": false,
     "users": ["User 모델"],
     "posts": ["Post 모델"]
   }
   ```
   `finished` : 방이 끝났는지 여부, finish날짜가 지나면 true로 되며, 방이 읽기 전용이 된다.

## 인증

### 회원가입

`POST /api/auth/register`

request

```json
{
  "username": "string",
  "email": "string (unique)",
  "password": "string",
  "profile": "string (link)"
}
```

### 로그인

`POST /api/auth/login`

request

```json
{
  "email": "string",
  "password": "string"
}
```

response

```json
{
  "token": "string",
  "user": "User 모델"
}
```

## 사용자 (토큰 필요)

### 아이디로 사용자 정보 가져오기

`GET /api/user/:id`

response

```
User 모델
```

### 모든 사용자 정보 가져오기

`GET /api/user`

response

```json
{
  "users": ["User 모델"]
}
```

## 방 (토큰 필요)

### 방 목록

`GET /api/room`

response

```json
{
  "rooms": ["Room 모델"]
}
```

현재 사용자(토큰 주인)의 방 목록을 구함

### 방 정보

`GET /api/room/:roomID`

response

```
Room 모델
```

### 방 생성

`POST /api/room`

request

```json
{
  "title": "string",
  "goal": "string",
  "continuous": true,
  "finish": 1580784527
}
```

response

```json
{
  "_id": "objectID"
}
```

### 방 입장

`POST /api/room/:roomID`

토큰 주인을 해당 방에 넣어준다.

## 포스트 (토큰 필요)

### 포스트 생성

`POST /api/post/:roomID`

request

```json
{
  "content": "string",
  "image": "string (link, optional)"
}
```

response

```json
{
  "_id": "objectID"
}
```

토큰 주인이 글을 쓴다.

### 포스트 정보

`GET /api/post/:postId`

response

```
POST 모델
```

### 투표

`POST /api/post/vote/:postID`

response

```json
{
  "agreedUsers": ["userObjectId"],
  "agreed": true
}
```

토큰 주인의 투표(동의) 여부를 토글한다.
