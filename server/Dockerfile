FROM node:18

WORKDIR /usr/src/server

COPY package*.json ./
RUN npm install

COPY . .

# Fix permission issue with wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

EXPOSE 3000
CMD ["npm", "start"]
