FROM --platform=$BUILDPLATFORM node:18-alpine AS deps
WORKDIR /app

COPY frontend/web-app/package*.json ./
RUN  npm i --cpu arm64 --os linux --omit-dev

FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/web-app ./

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm --cpu arm64 --os linux run build

# production image, copy all files and run next
FROM deps AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]