# Etapa 1: Compilar la aplicación React con Vite
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servidor web ultra ligero con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Configuración para que React Router funcione al recargar cualquier página
RUN printf 'server {\n listen 8080;\n location / {\n root /usr/share/nginx/html;\n index index.html;\n try_files $uri $uri/ /index.html;\n }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
