FROM node:23-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci

COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]