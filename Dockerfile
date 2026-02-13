# Use a lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (good caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the app for production
RUN npm run build

# Install a very small static server (serve)
RUN npm install -g serve

# Expose the port that serve will use
EXPOSE 3000

# Run the static server on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]