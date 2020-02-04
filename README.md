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
        "_id": "objectID",
        "username": "string",
        "email": "string",
        "profile": "string"
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
            "_id": "objectID",
            "author": {
                "name": "string",
                "profile": "string (link)"
            },
            "users": [
                {
                    "_id": "objectID",
                    "username": "string",
                    "email": "string",
                    "profile": "string"
                }
            ],
            "title": "string"
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
    "users": [
        {
            "_id": "objectID",
            "username": "string",
            "email": "string",
            "profile": "string"
        }
    ],
    "title": "string",
    "goal": "string",
    "posts": [
        {
            "id": "objectID",
            "image": "string (link)",
            "content": "string",
            "author": "userID",
            "agree": 5,
            "agreed": true
        },
    ]
}
```

- `agree`는 동의한 수
- `agreed`는 동의 했는지 여부

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
