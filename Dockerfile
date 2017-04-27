FROM node:7.7.3

EXPOSE 8080
EXPOSE 9229

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]

