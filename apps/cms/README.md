# cms

This project was created using create-payload-app using the ts-blog template.

## How to Run

### Run in development mode locally

Start the database service with:
```shell
cd docker/developments
docker compose up -d mongo
```
Start up your application by running:
```shell
yarn dev
```

### Run in development mode in a docker container locally

1. `cd` into `docker/development`
2. Run `docker compose up -d`

### Build and run in a docker container locally

Build the image by running from the project's root directory:
```shell
 docker build . -f ./apps/cms/docker/staging/Dockerfile \
 -t website_cms_staging_test    
```

Run the image with:
```shell
docker run -e "PAYLOAD_SECRET=some_secret" \
-e "MONGODB_URI=some_uri" \
-e "PAYLOAD_CONFIG_PATH=src/payload.config.ts" \
-p 3000:3000 website_cms_staging
```

Remember to change the secret var and the mongo URI.

[//]: # (2. run `docker compose up -d`)

[//]: # (### Build and run via minikube locally)

## Deployment

Deployment will be triggered upon a successfully merged Pull Request on Github

Github Actions will build an image of the cms service, and push it to Github Container Registry

