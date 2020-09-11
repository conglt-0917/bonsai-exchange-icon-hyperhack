<h1  align="center">Bonsai Exchange👋</h1>

<p>
<img  src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"  />
</p>

![Screenshot from 2020-09-08 09-33-35](https://user-images.githubusercontent.com/52224456/92427338-69d30380-f1b6-11ea-81f3-7a38989735ae.png)

## Live At

https://bonsai-exchange.web.app

## Bonsai Exchange Dapp

This demonstrates the three important parts of a dapp and how they should be connected:

1. The browser UI (ReactJS + Redux)
2. ICON SDK for JavaScript
3. SCORE (Python)

ICON Token Standard have used by app

1. BonSai (IRC-3): Each Bonsai has id unique, name and price.
2. Oxygen (IRC-2): Generate when user plant bonsai, use buy Bonsai.

## Functionality

Bonsai Exchange :

1. Buy plants from stock
2. Planting trees in the collection.
3. After a certain period of time (30 second), each bonsai will photosynthesize some oxygen.
4. Transfer bonsai to friend.

Future:

1. The contract has the ability to update properties such as the life of a plant, which will display other forms of the plant such as sprouting, flowering, and fruiting.

![growing](https://user-images.githubusercontent.com/52224456/92190568-b43d4300-ee8b-11ea-8699-3ce18938ed26.png)

2. It is possible to resell the trees you have planted

## Video Demo

[![demo](http://img.youtube.com/vi/VKY4rW4Waz0/0.jpg)](https://www.youtube.com/watch?v=VKY4rW4Waz0 'demo')

## How to play

**If you are beginer, you would go a tour with app**

![Screenshot from 2020-09-10 08-49-44](https://user-images.githubusercontent.com/52224456/92672310-9c116c00-f342-11ea-8184-aa5b09b3a0b1.png)

![Screenshot from 2020-09-10 08-53-32](https://user-images.githubusercontent.com/52224456/92672601-38d40980-f343-11ea-8a63-c8ea4f7288a4.png)

**You would be received 30 Oxygen to buy first Bonsai**

![Screenshot from 2020-09-10 08-42-20](https://user-images.githubusercontent.com/52224456/92672368-b77c7700-f342-11ea-9547-743906113135.png)

![receive-sucessfully](https://user-images.githubusercontent.com/52224456/92562602-70d64080-f2a0-11ea-961e-8968e1c6a60b.png)

**Let's buy**

![Screenshot from 2020-09-10 08-42-43](https://user-images.githubusercontent.com/52224456/92672412-d2e78200-f342-11ea-8145-c8c78a967bc3.png)

![Screenshot from 2020-09-10 08-43-31](https://user-images.githubusercontent.com/52224456/92672428-dbd85380-f342-11ea-8a03-0f3ce01dccad.png)

**Sign transaction with ICONex extension**

![sign-transaction](https://user-images.githubusercontent.com/52224456/92563722-340b4900-f2a2-11ea-8f4f-5439a72de2f8.png)

**Tada !**

![Screenshot from 2020-09-10 08-48-06](https://user-images.githubusercontent.com/52224456/92672489-fca0a900-f342-11ea-9806-1f25207aa48b.png)

**Buy Oxygen by ICX**

![Screenshot from 2020-09-10 08-53-47](https://user-images.githubusercontent.com/52224456/92672666-628d3080-f343-11ea-9c72-5e394669d4de.png)

**Transfer Bonsai To Friends**

![Screenshot from 2020-09-10 08-56-34](https://user-images.githubusercontent.com/52224456/92672725-8e101b00-f343-11ea-8d22-923dd8bf9e09.png)

**Move Position Of Bonsai**

![button-move](https://user-images.githubusercontent.com/52224456/92569395-ca436d00-f2aa-11ea-8145-74f6fed1abc6.png)

![move-bonsai](https://user-images.githubusercontent.com/52224456/92569327-ada73500-f2aa-11ea-80cb-b4d44331450a.png)

## How to run project

```bash
mkdir keystores
```

Copy JSON file of keystore (download from wallet ICONex) to folder keystores

### Deployment to local tbears instance

#### Deploy Bonsai Contract

```bash
tbears deploy bonsai -k keystores/keystore.json -c config/deploy_bonsai_local.json
```

#### Deploy SunCoin Contract

```bash
tbears deploy suncoin -k keystores/keystore.json -c config/deploy_oxygen_local.json
```

#### Check result transaction

```bash
tbears txresult [txHASH]
```

Copy the **scoreAddress** from the result

### Deployment to testnet

#### Faucet ICX testnet

- [https://faucet.sharpn.tech](https://faucet.sharpn.tech/)

- [http://icon-faucet.ibriz.ai](http://icon-faucet.ibriz.ai/)

- [https://faucet.reliantnode.com/](https://faucet.reliantnode.com/)

#### Deploy Bonsai Contract

```bash
tbears deploy bonsai -k keystores/keystore.json -c config/deploy_bonsai_testnet.json
```

#### Deploy Oxygen Contract

```bash
tbears deploy oxygen -k keystores/keystore.json -c config/deploy_oxygen_testnet.json
```

#### Update Bonsai contract

```bash
tbears deploy bonsai -m update -o [address contract] -k keystores/keystore2.json -c config/deploy_bonsai_testnet.json
```

#### Check transaction

```bash
tbears txresult <txhash> -c config/depoy_bonsai_testnet.json
```

### With Docker

```bash
docker-compose up
```

#### Deploy Bonsai Score

```bash
docker-compose exec Icon tbears deploy bonsai -k keystores/keystore.json -c config/deploy_bonsai_testnet.json
```

#### Deploy Oxygen Score

```bash
docker-compose exec Icon tbears deploy oxygen -k keystores/keystore.json -c config/deploy_oxygen_testnet.json
```

**Testnet tracker**: https://bicon.tracker.solidwallet.io/ put the score address

### Run UI

```bash
cd ui
cp .env.example .env
yarn
```

Copy my info of wallet to `.env`

```bash
yarn start
```

View in localhost:3000
