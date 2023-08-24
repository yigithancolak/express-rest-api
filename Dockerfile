FROM node:20.5-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install 

COPY . .

RUN npm run build

#

FROM node:20.5-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8888

CMD ["node","dist/index.js"]
