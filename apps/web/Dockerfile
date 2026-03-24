# Dockerfile for my-dev-portfolio Next.js app (Bun workspace monorepo)

FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat
RUN npm install -g bun
WORKDIR /app

FROM base AS deps

COPY package.json bun.lock turbo.json tsconfig.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/api/package.json packages/api/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/env/package.json packages/env/package.json

RUN bun install --frozen-lockfile --ignore-scripts

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun install --frozen-lockfile --ignore-scripts

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build-time defaults (override with --build-arg in CI/CD)
ARG DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
ARG CORS_ORIGIN=http://localhost:3000
ENV DATABASE_URL=${DATABASE_URL}
ENV CORS_ORIGIN=${CORS_ORIGIN}

RUN bunx turbo run build --filter=web

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app ./

USER nextjs

EXPOSE 3000

CMD ["bun", "--cwd", "apps/web", "run", "start", "--", "--hostname", "0.0.0.0", "--port", "3000"]
