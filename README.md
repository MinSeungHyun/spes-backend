# Spes Backend

## 인증

### 회원가입
`POST /api/auth/register`

```json
{
    "username" : "string",
    "email" : "string (unique)",
    "password" : "string",
    "profile": "string (link)",
}
```

### 로그인
`POST /api/auth/login`

```json
{
    "email": "string",
    "password": "string"
}
```

```json
{
    "token": "string",
    "user": {
        "id": "objectID",
        "username": "string",
        "email": "string"
    }
}
```

## 방

### 방 목록
`GET /api/room`

```json
{
    "rooms": [
        {
            "id": "objectID",
            "author": {
                "name": "string",
                "profile": "string (link)"
            },
            "users": 0,
            "title": "string",
            "created": 1580784527,
        }
    ]
}
```

현재 사용자(토큰 주인)의 방 목록을 구함

### 방 정보
`GET /api/room/:roomID`

```json
{
    "id": "objectID",
    "users": ["여준호", "민승현", "손지민"],
    "title": "string",
    "goal": "string",
    "posts": [
        {
            "id": "objectID",
            "image": "string (link)",
            "content": "string",
            "author": {
                "name": "string",
                "profile": "string (link)"
            },
            "vote": [5, 3],
            "current": 0,
        },
    ]
}
```

- `vote[0]`은 찬성 수, `vote[1]`은 반대 수
- `current`가 0이면 투표안함, 1이면 찬성, 2면 반대

### 방 생성
`POST /api/room`

```json
{
    "title": "string",
    "goal": "string",
    "continuous": true,
    "finish": 1580784527
}
```

```json
{
    "id": "objectID"
}
```

### 방 입장
`POST /api/room/:roomID`

```json
{}
```

토큰 주인을 해당 방에 넣어준다.

## 포스트

### 포스트 생성
`POST /api/post/:roomID`

```json
{
    "image": "string (link)",
    "content": "string"
}
```

```json
{
    "id": "objectID"
}
```

토큰 주인이 글을 쓴다.
