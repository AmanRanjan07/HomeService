# Frontend Dockerfile (React)
FROM node:20-alpine AS build
WORKDIR /app

# First copy only package files to leverage Docker cache
COPY package*.json ./
RUN npm install

# Then copy the rest of the application
COPY public/ public/
COPY src/ src/
COPY tsconfig.json .

# Build the application
RUN npm run build

# Stage 2 - Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application
COPY --from=build /app/build .

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O - http://localhost:3000/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
