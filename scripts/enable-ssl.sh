#!/bin/sh
set -eu

DOMAIN="${DOMAIN:-credbusinessbank.com.br}"
WWW_DOMAIN="${WWW_DOMAIN:-www.credbusinessbank.com.br}"
EMAIL="${LETSENCRYPT_EMAIL:-}"

if [ -z "$EMAIL" ]; then
  echo "Defina LETSENCRYPT_EMAIL antes de rodar. Exemplo:"
  echo "LETSENCRYPT_EMAIL=contato@credbusinessbank.com.br sh scripts/enable-ssl.sh"
  exit 1
fi

mkdir -p nginx/conf.d nginx/certbot/www nginx/certbot/conf

docker compose up -d nginx

docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN"

cat > nginx/conf.d/ssl.conf <<EOF
server {
  listen 443 ssl http2;
  server_name $DOMAIN $WWW_DOMAIN;

  ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:10m;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;

  client_max_body_size 20m;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  location /health {
    access_log off;
    return 200 "ok\\n";
    add_header Content-Type text/plain;
  }

  location / {
    proxy_pass http://next_app;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_cache_bypass \$http_upgrade;
    proxy_read_timeout 120s;
  }
}
EOF

docker compose up -d nginx
docker compose exec nginx nginx -s reload

echo "HTTPS habilitado para https://$DOMAIN"
