Spes Backend
===
## Register
POST /api/auth/register  
```JSON
{
    "username" : "string",
    "email" : "string (unique)",
    "password" : "string"
}
```

## Login
POST /api/auth/login
```JSON
{
    "email" : "string",
    "password" : "string"
}
```

## User list
GET /api/user/list