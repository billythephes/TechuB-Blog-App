FROM node:19.1.0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 6890

CMD ["npm", "start"]