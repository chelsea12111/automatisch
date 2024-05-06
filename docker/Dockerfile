# syntax=docker/dockerfile:1
FROM node:18-alpine as builder

ENV PORT 3000

RUN \
  apk --no-cache add --virtual build-dependencies python3 build-base git

WORKDIR /app

# copy the app, note .dockerignore
COPY package.json package-lock.json ./

RUN yarn

COPY . .

RUN yarn build

RUN \
  rm -rf /usr/local/share/.cache/ && \
  apk del build-dependencies

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
