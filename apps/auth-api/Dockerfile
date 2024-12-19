FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./ turbo.json ./
COPY packages/ ./packages/
COPY apps/auth-api ./apps/auth-api/


RUN npm install
RUN npm run build --workspace=apps/auth-api

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/auth-api/package*.json ./apps/auth-api/
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/apps/auth-api/dist ./apps/auth-api/dist

RUN npm install --omit:dev --workspace=apps/auth-api

WORKDIR /app/apps/auth-api

ENV NODE_ENV=production \
    PORT=8080

CMD ["npm", "run", "start:prod"]

EXPOSE 8080