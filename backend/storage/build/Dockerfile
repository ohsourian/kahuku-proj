FROM node:16-alpine
WORKDIR /usr/src/app
RUN apk add --update --no-cache build-base python3
RUN npm install -g yarn pm2 --force
COPY . .
RUN yarn install --prod
CMD ["pm2", "start", "./storage/build/ecosystem.config.js", "--no-daemon"]
