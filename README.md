# mns-metadata-service
MNS - Metadata Service for NFTs

## Install Dependencies
```shell
yarn install
```

## Run Application
Rename .env.template to .env and set variables

```shell
yarn build && yarn dev
```

## How to install fonts on ubuntu?
```shell
sudo apt-get install fontconfig && sudo fc-cache -f -v
```

## Build Docker Image
```shell
docker build -t {{user}}/mns-metadata-service .
```

## Run Docker Image
```shell
docker run -it -p {{port}}:{{port}} --env-file .env {{user}}/mns-metadata-service
```
