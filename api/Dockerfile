FROM node:18-alpine
COPY ./ /usr/app/api
WORKDIR /usr/app/api
ENV NODE_VERSION 18.12.1
ENV YARN_VERSION 1.22.19
RUN apk update && apk add git && yarn install
EXPOSE 3000
ENV CI=true