# cms

This application is a Content Management System and Admin Panel for the SCSE Website

## How to Run

Run the following commands from the `apps/cms` directory

### Run in development mode locally

Start the database service with:

```shell
cd docker/development
docker compose up -d mongo
```

Start up your application by running:

```shell
yarn install
yarn dev
```

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

[//]: # "2. run `docker compose up -d`"

[//]: # "### Build and run via minikube locally"

## Deployment

Deployment will be triggered upon a successfully merged Pull Request on Github, based on [this Github Workflow](../../.github/workflows/cd-staging.yml)

Github Actions will build an image of the cms service, and push it to Github Container Registry (GHCR), and then deploy it to the staging environment.

You can view the image in GHCR, here: https://github.com/ntuscse/website/pkgs/container/website%2Fcms
