# mns-metadata-service

## API

### Request
- __network:__ Name of the chain to query for. (monad | monad-testnet ...)
- __contactAddress:__ accepts contractAddress of the NFT which represented by the tokenId
- __NFT v1 - tokenId:__ accepts MNS name or labelhash of MNS name in both hex and int format
- __NFT v2 - tokenId:__ accepts MNS name or namehash of MNS name in both hex and int format

```
/{network}/{contractAddress}/{tokenId}
```

Request (example)

https://metadata.monadns.com/monad/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/42219085255511335250589442208301538195142221433306354426240614732612795430543/

### Response (example)

```json
{
  "is_normalized": true,
  "name": "nick.mon",
  "description": "nick.mon, an MNS name.",
  "attributes": [
    {
      "trait_type": "Created Date",
      "display_type": "date",
      "value": 1571924851000
    },
    {
      "trait_type": "Length",
      "display_type": "number",
      "value": 4
    },
    {
      "trait_type": "Segment Length",
      "display_type": "number",
      "value": 4
    },
    {
      "trait_type": "Character Set",
      "display_type": "string",
      "value": "letter"
    },
    {
      "trait_type": "Registration Date",
      "display_type": "date",
      "value": 1580803395000
    },
    {
      "trait_type": "Expiration Date",
      "display_type": "date",
      "value": 1699709554000
    }
  ],
  "name_length": 4,
  "segment_length": 4,
  "url": "https://app.monadns.com/name/nick.mon",
  "version": 0,
  "background_image": "https://metadata.monadns.com/monad/avatar/nick.mon",
  "image": "https://metadata.monadns.com/monad/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/0x5d5727cb0fb76e4944eafb88ec9a3cf0b3c9025a4b2f947729137c5d7f84f68f/image",
  "image_url": "https://metadata.monadns.com/monad/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/0x5d5727cb0fb76e4944eafb88ec9a3cf0b3c9025a4b2f947729137c5d7f84f68f/image"
}

```

More info and list of all endpoints: https://metadata.monadns.com/docs


## How to setup

```
git clone https://github.com/mondomains/mns-metadata-service.git
cd mns-metadata-service
cp .env.org .env // Fill in Vars
yarn
yarn dev
```


## How to deploy (Google App Engine)

Modify the app_template.yaml according to your needs. Then run;

```
yarn deploy
```


## How to test

Regular unit test;
```
yarn test
```

Unit test + coverage;
```
yarn test:cov
```


## Environment Variables

| Name | Description | Default value | Options |
| ---- | ----------- | ------------- | ------- |
| HOST | Host (ip/domain) address of the running service | localhost | - | No |
| ENV | Project scope | local | local/prod |
| REDIS_URL | (Optional) Redis connection if you want to enable rate limiter | - | - |
| INAMEWRAPPER | InterfaceId of NameWrapper Contract | 0xe89c48dc | - |
| ADDRESS_MON_REGISTRAR | Monad address of MNSBaseRegistrar Contract | 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85 | - |
| ADDRESS_NAME_WRAPPER | Monad address of NameWrapper Contract | 0x582224b8d4534F4749EFA4f22eF7241E0C56D4B8 | - |
| WEB3_NODE_URL | Monad Node Provider API | - | - |
| NODE_PROVIDER | Monad Node Provider | Cloudflare | Cloudflare/Google/Infura/Local |
| NODE_PROVIDER_URL | Monad Node Provider API Endpoint | - | - |
| VPC_ACCESS_CONNECTOR | (Optional) Needed if you will setup Memorystore for GAE | - | - |