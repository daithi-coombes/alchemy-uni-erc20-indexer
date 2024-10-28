# API
This api will act as a middle man between the front end react-vite app and the alchemy endpoints. This keeps the api key hidden.

## Routes:

 - POST `/core/:method` {args: [...]}

## example

`curl -X POST -data '{args: ["0x0"]}' http://localhost:8080/core/getTokenBalances`

# Usage

1st make sure you've updated the environments in `../.env`, see `../.env-sample`.

To run the api
```
npm run start
```

# Testing

```
npm test
```
