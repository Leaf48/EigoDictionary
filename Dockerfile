FROM node:lts

EXPOSE 3000

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN apt update && apt upgrade -y

RUN npm i

RUN npm run build-linux

CMD ["node", "index.js"]