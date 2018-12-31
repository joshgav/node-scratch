FROM node:latest

EXPOSE 8080
EXPOSE 9229

ARG NODE_ENV=development

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

CMD ["npm", "start"]
