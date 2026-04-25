#!/bin/sh
set -e

echo "[GloryBank] Aguardando banco de dados..."
sleep 3

echo "[GloryBank] Aplicando schema no banco..."
npx prisma db push --accept-data-loss

echo "[GloryBank] Iniciando aplicação..."
exec npm start
