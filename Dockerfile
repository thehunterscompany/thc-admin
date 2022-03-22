FROM node:16-alpine AS builder

ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
# Copy app files
COPY . .
# Build the app
RUN yarn build

# stage 2 - build the final image and copy the react build files

EXPOSE 3000

CMD ["yarn", "start"]