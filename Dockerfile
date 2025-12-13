# Multi-stage build for Astro static site
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime: nginx with gzip+brotli and cache headers
FROM nginx:1.27-alpine

# Brotli module + envsubst for PORT templating
RUN apk add --no-cache nginx-mod-http-brotli gettext

# Default PORT for platforms like Timeweb App Platform
ENV PORT=8080

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["/bin/sh", "-c", "envsubst '$$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
