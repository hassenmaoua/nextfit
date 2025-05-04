# Build Angular App
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

# Serve with Nginx
FROM nginx:1.27.5
COPY --from=builder /app/dist/nextfit-ng/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
