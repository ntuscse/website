FROM node:14-alpine3.10 as ts-compiler
WORKDIR /usr/app
COPY package.json ./
COPY tsconfig.json ./
RUN rm -rf ./node_modules ./dist ./out
RUN npm install
COPY . ./
RUN npm run build

FROM node:14-alpine3.10 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/dist ./
RUN npm install

FROM gcr.io/distroless/nodejs:14
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
USER 1000
CMD ["server.js"]

