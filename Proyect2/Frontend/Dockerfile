# Use Node.js 20.9 as the base image for building the app
FROM node:20.9 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use an official nginx image to serve the app
FROM nginx:alpine

# Copy the built files from the previous build stage to nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html


# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
