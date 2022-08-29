# build-stage
FROM node:16-alpine as build-stage
WORKDIR /usr/src/app
RUN apk add --update --no-cache build-base python3
RUN npm install -g yarn --force
COPY . .
RUN yarn install
RUN yarn build
# deploy-stage
FROM node:16-alpine as deploy-stage
WORKDIR /usr/src/app
RUN apk add --update --no-cache build-base nginx
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/storage/build/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
