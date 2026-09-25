FROM mcr.microsoft.com/playwright:v1.63.0-noble

USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY runtime/worker/worker.mjs ./worker.mjs

ENV PORT=8788 \
    REPO_URL=https://github.com/MylloVinyllo/procedural-film.git \
    ARTIFACT_ROOT=/artifacts \
    JOB_ROOT=/tmp/procedural-film-jobs \
    NPM_CONFIG_CACHE=/npm-cache \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright \
    MAX_CONCURRENT=1

EXPOSE 8788

CMD ["node", "worker.mjs"]
