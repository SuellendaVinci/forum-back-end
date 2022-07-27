# Configuração e instalação da aplicação

<p>Primeiramente para utilizar a aplicação localmente devemos ter o NodeJS e o Postgres instalados localmente na máquina.</p>
<p>Em seguida para configurar o banco de dados basta ir no aquivo em src/configs/db.ts e colocar as informações para acesso do seu banco de dados local</p>
<p>Então devemos rodar os seguinte comando no terminal para instalar as dependencias do projeto</p>

```
yarn
```

<p>Após isso, basta rodar a aplicação com</p>

```
yarn start
```

# Documentação da API

<p>A URL para acesso remoto da API é:</p>
```
https://forum-db-lets-code.herokuapp.com
```

<p>Em algumas rotas é necessário enviar o token no headers para fazer autenticação. Como é o caso das rotas para cadastro de posts, comentários e likes</p>
<p>Em seguida serão apresentadas as rotas da aplicação</p>

## Rota para cadastro de funções de usuário (POST /roles)

<p>A rota a seguir mostra um exemplo de requisição para cadastro de uma função de usuário</p>

```
REQUEST
POST /roles

{
	"name": "Administrator"
}
```

<p>Temos a seguinte resposta</p>

```
RESPONSE
POST /roles

{
  "name": "Administrator",
  "id": 1
}
```

## Rota para cadastro de usuário (POST /users)

<p>A rota a seguir mostra um exemplo de requisição para cadastro de usuário</p>

```
REQUEST
POST /users

{
	"name": "Suellen Camargo",
	"email":"suellen_fleur@hotmail.com",
	"password":"123456",
	"passwordConfirmation":"123456",
	"ocupation":"Web developer",
	"roleId":1
}
```

<p>Temos a seguinte resposta</p>

```
RESPONSE
POST /users

{
  "name": "Suellen Camargo",
  "email": "suellen_fleur@hotmail.com",
  "password": "123456",
  "gender": null,
  "ocupation": "Web developer",
  "city": null,
  "role": {
    "id": 1,
    "name": "Administrator"
  },
  "id": 1
}
```

## Rota para login de usuário (POST /login)

<p>A rota a seguir mostra um exemplo de requisição para login de usuário</p>

```
REQUEST
POST /login

{
	"email":"suellen_fleur@hotmail.com",
	"password":"123456"
}
```

<p>Temos a seguinte resposta</p>

```
RESPONSE
POST /login

{
  "id": 1,
  "name": "Suellen Camargo",
  "email": "suellen_fleur@hotmail.com",
  "password": "123456",
  "gender": null,
  "ocupation": "Web developer",
  "city": null,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4OTUzOTgxLCJleHAiOjE2NTk1NTg3ODF9.QPW3vDyAePUtAW1rD7eXvFfvJOH4FTE3HmP96UEa_uU"
}
```

## Rota para cadastro de posts (POST /posts)

<p>A rota a seguir mostra um exemplo de requisição para cadastro de posts</p>

```
REQUEST
headers:{
            authorization: access_token
        }
POST /posts

{
	"message": "Cream Crackers Team is the best team of this Hackathon!"
}
```

<p>Temos a seguinte resposta</p>

```
RESPONSE
POST /login

{
  "message": "Cream Crackers Team is the best team of this Hackathon!",
  "user": {
    "id": 1,
    "name": "Suellen Camargo",
    "email": "suellen_fleur@hotmail.com",
    "password": "123456",
    "gender": null,
    "ocupation": "Web developer",
    "city": null
  },
  "id": 1
}
```

## Rota para listagem de posts (GET /posts)

<p>A rota a seguir mostra um exemplo de requisição para cadastro de posts</p>

```
REQUEST
GET /posts
```

<p>Temos a seguinte resposta</p>

```
RESPONSE
GET /posts

[
  {
    "id": 1,
    "message": "Cream Crackers Team is the best team of this Hackathon!",
    "comments": [
      {
        "id": 1,
        "message": "Free Education with quality for everybody!"
      }
    ]
  }
]
```

## Rota para cadastro de comentários (POST /comments)

<p>A rota a seguir mostra um exemplo de requisição para cadastro de comentários</p>

```
REQUEST
headers:{
            authorization: access_token
        }
POST /comments

{
	"message":"Free Education with quality for everybody!",
	"postId":1
}
```

<p>Temos a seguinte resposta</p>

```
RESPONSE
POST /comments

{
  "message": "Free Education with quality for everybody!",
  "user": {
    "id": 1,
    "name": "Suellen Camargo",
    "email": "suellen_fleur@hotmail.com",
    "password": "123456",
    "gender": null,
    "ocupation": "Web developer",
    "city": null
  },
  "post": {
    "id": 1,
    "message": "Cream Crackers Team is the best team of this Hackathon!"
  },
  "id": 1
}
```

## Rota para cadastrar likes (POST /likes)

<p>A rota a seguir mostra um exemplo de requisição para cadastrar likes</p>

```
REQUEST
headers:{
            authorization: access_token
        }
POST /likes

{
	"commentId":1
}
```

<p>Temos a seguinte resposta</p>

```
RESPONSE
POST /likes

{
  "user": {
    "id": 1,
    "name": "Suellen Camargo",
    "email": "suellen_fleur@hotmail.com",
    "password": "123456",
    "gender": null,
    "ocupation": "Web developer",
    "city": null
  },
  "comment": {
    "id": 1,
    "message": "Free Education with quality for everybody!"
  },
  "id": 1
}
```
