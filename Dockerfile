FROM alpine:latest

RUN apk add --update-cache nodejs npm yarn
RUN yarn add typescript ts-node
WORKDIR /app

COPY package*.json ./
RUN yarn
RUN yarn add dotenv 
RUN yarn add --save-dev @types/node @types/dotenv
COPY . .

CMD ["npm", "start"]