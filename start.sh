#!/bin/sh
set -e

echo "[CredBusiness] Aguardando banco de dados..."
sleep 3

echo "[CredBusiness] Aplicando schema no banco..."
npx prisma db push --accept-data-loss

echo "[CredBusiness] Iniciando aplicação..."
exec npm start
