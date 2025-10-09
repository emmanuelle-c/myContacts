FROM node:23-alpine AS base
WORKDIR /app

COPY package*.json .
RUN npm config set registry https://registry.npmjs.org/
RUN npm install

COPY . .

RUN echo "VITE_API_URL=$VITE_API_URL" > .env.production
RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
