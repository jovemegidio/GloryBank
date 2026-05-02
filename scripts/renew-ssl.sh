#!/bin/sh
set -eu

docker compose run --rm certbot renew
docker compose exec nginx nginx -s reload
