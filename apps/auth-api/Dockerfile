FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=9090

CMD ["npm", "run", "start:prod"]

EXPOSE 9090