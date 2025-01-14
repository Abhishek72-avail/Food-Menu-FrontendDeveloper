# FROM node:latest
# WORKDIR /app
# COPY package*.json ./
# RUN npm cache clean --force
# RUN npm install
# COPY . .
# EXPOSE 4000
# CMD ["npm", "start"]

# Build stage
FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --production
EXPOSE 4000
CMD ["npm", "start"]