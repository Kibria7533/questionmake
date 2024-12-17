# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to leverage Docker cache
COPY package.json ./

RUN rm -f /etc/localtime \
&& ln -sv /usr/share/zoneinfo/Asia/Dhaka /etc/localtime \
&& echo "Asia/Dhaka" > /etc/timezone

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .



# Expose port 3000 (adjust according to your app's configuration)
EXPOSE 3000
# Start the application
CMD ["npm", "run", "dev"]