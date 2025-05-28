FROM node:18

WORKDIR /usr/src/server

# Install dos2unix early (before COPY) to improve build caching
RUN apt-get update && apt-get install -y dos2unix

# Copy only package files first and install dependencies
COPY package*.json ./
RUN npm install

# Copy all remaining project files (including wait-for-it.sh)
COPY . .

# Convert wait-for-it.sh to Unix format and make it executable
RUN dos2unix ./wait-for-it.sh && chmod +x ./wait-for-it.sh

EXPOSE 3000

CMD ["npm", "start"]
