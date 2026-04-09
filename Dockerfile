# Base stage for building the static files
FROM node:lts AS base
WORKDIR /app

# Install npm
RUN npm install -g npm@latest

# Install project dependencies
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage for serving the application
FROM nginx:mainline-alpine-slim AS runtime
COPY --from=base /app/dist /usr/share/nginx/html
EXPOSE 80
