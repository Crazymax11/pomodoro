FROM node:12 as builder

COPY src /src
COPY index.html package.json package-lock.json vite.config.ts tsconfig.json /

RUN npm ci
RUN npm run build

FROM redsadic/docker-http-server
COPY --from=builder /dist /src/public /public
