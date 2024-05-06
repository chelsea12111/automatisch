# syntax=docker/dockerfile:1

# Use an official Node.js runtime as the base image
FROM node:18-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Set an environment variable for the port
ENV PORT 3000

# Install build-time dependencies
RUN apk add --no-cache --virtual .build-deps python3 build-base git

# Copy only the package.json and package-lock.json files to minimize the number of layers
COPY package*.json ./

# Install the dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Remove the build-time dependencies
RUN apk del .build-deps && rm -rf /usr/local/share/.cache

# Use an official Node.js runtime as the base image for the production environment
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy only the necessary files to minimize the number of layers
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the port
EXPOSE 3000

# Set the default command to run when the container starts
CMD ["node", "dist/index.js"]

