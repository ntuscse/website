FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN rm -rf **/node_modules **/build **/dist **/out **/.turbo
RUN rm -rf **/.env
RUN turbo prune --scope=cms --docker

FROM node:18-alpine AS installer
# Add lockfile and package.json's of isolated subworkspace
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn --version
RUN yarn install --verbose

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=cms...

FROM node:18-alpine AS runner

WORKDIR /app

# Don't run production as root
#RUN addgroup --system --gid 1001 expressjs
#RUN adduser --system --uid 1001 expressjs
#USER expressjs

COPY --from=installer /app .
RUN rm -rf /app/apps/cms/src

WORKDIR /app/apps/cms

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ENV BABEL_DISABLE_CACHE=1

EXPOSE 80
#EXPOSE 7001

CMD ["node", "dist/server.js"]

