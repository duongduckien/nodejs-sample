# NodeJS Sample
#### ExpressJS, Typescript, TypeORM, MySQL

## 1. Running project
### Stable environment

1. Node version: ```14.0.0```
2. Yarn version: ```1.22.4```
3. NPM version: ```6.14.5```
4. MySQL version: ```8.0.21```

#### 1.1. Setup
1. Install packages

```$ yarn``` or ```$ yarn install```

2. Create .env file in the root folder and update some variables
```
DB_HOST={your_host}
DB_USER={your_user}
DB_PASSWORD={your_password}
DB_NAME={your_db}
PORT={your_running_port}
NODE_ENV=local
TOKEN_SECRET_KEY=test
```

#### 1.2. Running
```$ yarn dev``` or ```$ npm run dev```