#FROM imbios/bun-node:1.1.4-21.7.3-debian
FROM node:21.2.0-bookworm-slim as build
WORKDIR /usr/src/app


COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY ./ ./
RUN npm run build


EXPOSE 80

ENV PORT=80

RUN chmod +x start.sh

CMD ./start.sh