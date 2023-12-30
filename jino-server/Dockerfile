FROM node:21.5.0-alpine as build
WORKDIR /build
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src
RUN yarn install
RUN yarn build



FROM node:21.5.0-alpine as prod_modules
WORKDIR /prod_modules
COPY ./package.json ./package.json
RUN yarn install --production



FROM node:21.5.0-alpine
WORKDIR /app
COPY --from=build /build/package.json ./package.json
COPY --from=build /build/yarn.lock ./yarn.lock
COPY --from=build /build/dist ./dist
COPY --from=prod_modules /prod_modules/node_modules ./node_modules
EXPOSE 3000
CMD ["yarn", "start"]
