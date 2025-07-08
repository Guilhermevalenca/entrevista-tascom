FROM node:22-alpine

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .

RUN yarn migrate
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]