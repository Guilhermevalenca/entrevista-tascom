FROM node:22-alpine

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 4173

CMD ["yarn", "preview"]