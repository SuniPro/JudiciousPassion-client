# Step 1: Build React app
FROM node:22 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Serve React app with a lightweight server
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# ✅ Vite 빌드 결과물을 dist/에서 가져오기 (수정됨)
COPY --from=build /app/dist .

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Ensure log directory exists
RUN mkdir -p /var/log/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
