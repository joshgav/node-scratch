FROM node:10.13.0-alpine

EXPOSE 8080
EXPOSE 9229

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]

