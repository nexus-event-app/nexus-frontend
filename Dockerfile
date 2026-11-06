# Etapa 1: compilar la aplicación con Vite
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Se incorporan al bundle en tiempo de build
ARG VITE_API_URL=
ARG VITE_SITE_URL=http://localhost:5173
# Datos legales del titular (ver README): se pasan con --build-arg, nunca en el repositorio
ARG VITE_LEGAL_OWNER_NAME=
ARG VITE_LEGAL_OWNER_ID=
ARG VITE_LEGAL_ADDRESS=
ARG VITE_LEGAL_EMAIL=
ARG VITE_LEGAL_HOSTING_PROVIDER=
ENV VITE_API_URL=$VITE_API_URL \
    VITE_SITE_URL=$VITE_SITE_URL \
    VITE_LEGAL_OWNER_NAME=$VITE_LEGAL_OWNER_NAME \
    VITE_LEGAL_OWNER_ID=$VITE_LEGAL_OWNER_ID \
    VITE_LEGAL_ADDRESS=$VITE_LEGAL_ADDRESS \
    VITE_LEGAL_EMAIL=$VITE_LEGAL_EMAIL \
    VITE_LEGAL_HOSTING_PROVIDER=$VITE_LEGAL_HOSTING_PROVIDER

RUN npm run build

# Etapa 2: nginx sin privilegios sirviendo la SPA y haciendo de proxy al backend
FROM nginxinc/nginx-unprivileged:1.27-alpine

# BACKEND_URL: origen del backend, sin barra final ni ruta (p. ej. http://backend:8080)
ENV BACKEND_URL=http://backend:8080 \
    NGINX_ENVSUBST_FILTER=^BACKEND_URL\$

COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY docker/nginx/snippets/ /etc/nginx/snippets/
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
