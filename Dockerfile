FROM node:24.15-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

COPY . ./

RUN npm run build

FROM build AS test

RUN npm test

FROM nginxinc/nginx-unprivileged:1.30-alpine AS runtime

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD wget -qO- http://127.0.0.1:8080/ || exit 1
