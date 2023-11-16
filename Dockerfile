# Base image for the build stage
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm ci --omit=dev

# Install the Nest CLI
RUN npm install -g @nestjs/cli

# Copy the source code to the container
COPY . .

# # Build the NestJS application
# RUN npm run build

# RUN npm run migration-generate
# RUN npm run migration

# # Base image for the final stage
# FROM node:18-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the built application from the builder stage
# COPY --from=builder /app/dist ./dist

# # Expose the port on which your NestJS application will run
# EXPOSE 3000

# # Start the NestJS application
# CMD ["node", "dist/main.js"]
