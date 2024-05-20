FROM node:20.13.1
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "dev" ]

EXPOSE 9009