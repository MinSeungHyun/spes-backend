Spes Backend
===
## 회원가입
POST /api/auth/register  
```JSON
{
    username: string,
    email: string (unique),
    password: string
}
```