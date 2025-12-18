FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy source
COPY src ./src

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "src/server.js"]
