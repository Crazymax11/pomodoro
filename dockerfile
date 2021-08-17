FROM node:12 as builder

COPY src /src
COPY public /public
COPY index.html package.json package-lock.json vite.config.ts tsconfig.json /

RUN yarn
RUN yarn build

FROM redsadic/docker-http-server
COPY --from=builder /dist /public
COPY --from=builder /public /public/public
