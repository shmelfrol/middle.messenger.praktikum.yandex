FROM node

# Create app directory
WORKDIR /myapp



COPY . .
COPY package*.json ./
RUN npm install
RUN  npm run webpack-prod

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source


EXPOSE 3000
CMD ["node", "server.js"]
