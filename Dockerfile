FROM node:lts-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:lts-alpine AS runtime
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./
RUN npm ci --production

ENV NODE_ENV=production
ENV HOST=0.0.0.0  
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
