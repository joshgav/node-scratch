FROM node:latest

EXPOSE 8080
EXPOSE 9229

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD ["npm", "start"]

