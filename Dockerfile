# syntax=docker/dockerfile:1
FROM node:19
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "build"]
