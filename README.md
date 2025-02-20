# mns-metadata-service
MONAD Domains Metadata Service for NFTs

## How to install?
```shell
yarn install
```

## How to run?
```shell
yarn build && yarn dev
```

## How to install fonts on ubuntu?
```shell
sudo apt-get install fontconfig && sudo fc-cache -f -v
```

## Sepolia Contracts
Registry: 0x2F97F7FBea0673648eF545d6fBBee567F8B9781c
Registrar: 0xC2b4bAE402d2495Cd012Cb4Cb3C883A9619465EE

## Build Docker Image
```shell
docker build -t user/mns-metadata-service .
```

## Run Docker Image
```shell
docker run -it -p 8080:8080 --env-file .env rdonmez/mns-metadata-service
```
