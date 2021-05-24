FROM node:12

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 80

RUN yarn generate

CMD ["yarn", "start"]
