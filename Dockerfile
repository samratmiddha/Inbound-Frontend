# syntax=docker/dockerfile:1
FROM node:19
WORKDIR /app
COPY . .
RUN npm install 
CMD ["npm", "start"]
EXPOSE 3000