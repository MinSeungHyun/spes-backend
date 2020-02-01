Spes Backend
===
## 회원가입
POST /api/auth/register  
```JSON
{
    "username" : "string",
    "email" : "string (unique)",
    "password" : "string"
}
```

## 로그인
POST /api/auth/login
```JSON
{
    "email" : "string",
    "password" : "string"
}
```