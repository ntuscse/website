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

[//]: # (### Build and run in a docker container locally)

[//]: # ()
[//]: # (1. `cd` into `docker/staging`)

[//]: # (2. run `docker compose up -d`)

[//]: # (### Build and run via minikube locally)

## Deployment

Deployment will be triggered upon a successfully merged Pull Request on Github

Github Actions will build an image of the cms service, and push it to Github Container Registry

