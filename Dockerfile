FROM node:16-alpine AS builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install --production --ignore-scripts --prefer-offline
ENV NODE_ENV production
COPY . /app
RUN yarn build

# stage 2 - build the final image and copy the react build files

EXPOSE 3000

CMD ["yarn", "start"]