
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /frontend
# Copy files
COPY . .

RUN npm install -g npm@9.4.2
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci --legacy-peer-deps
RUN npm install react-router-dom react-bootstrap bootstrap react-icons
# Build the app
# RUN npm run build
# RUN npm install react-bootstrap bootstrap

# ==== RUN =======
# Set the env to "production"
# ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start"]
