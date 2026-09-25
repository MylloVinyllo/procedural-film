FROM node:22-bookworm-slim

WORKDIR /app

COPY runtime/mcp/package.json ./package.json
RUN npm install --omit=dev --no-audit --no-fund

COPY runtime/mcp/server.mjs ./server.mjs

ENV PORT=8080 \
    WORKER_URL=http://worker:8788 \
    ARTIFACT_ROOT=/artifacts \
    MAX_INLINE_ARTIFACT_BYTES=33554432

USER node
EXPOSE 8080

CMD ["node", "server.mjs"]
