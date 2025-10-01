# Use Node.js version 23.11 (alpine-based image)
FROM node:23.11-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port 3000 (standard for Next.js)
EXPOSE 3000

# Run Next.js in dev mode or start production server
CMD ["npm", "run", "dev"]
