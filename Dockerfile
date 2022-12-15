FROM node:16.15.0

# Create app directory
WORKDIR /myapp



COPY . .
COPY package*.json ./
RUN npm install
RUN  npm run webpack-prod


EXPOSE 3000
CMD ["node", "server.js"]
