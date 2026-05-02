param(
  [string]$HostName = "187.45.255.152",
  [string]$User = "root",
  [string]$RemotePath = "/opt/credbusiness",
  [switch]$EnableSsl,
  [string]$LetsEncryptEmail = ""
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
  throw "OpenSSH/ssh nao encontrado no Windows."
}

if (-not (Get-Command scp -ErrorAction SilentlyContinue)) {
  throw "OpenSSH/scp nao encontrado no Windows."
}

$repoRoot = (git rev-parse --show-toplevel).Trim()
Set-Location $repoRoot

$archiveDir = Join-Path $repoRoot ".deploy"
New-Item -ItemType Directory -Force -Path $archiveDir | Out-Null
$archivePath = Join-Path $archiveDir "credbusiness.tar"

git archive --format=tar --output=$archivePath HEAD

$target = "$User@$HostName"
scp $archivePath "${target}:/tmp/credbusiness.tar"

$remoteCommands = @"
set -eu
mkdir -p '$RemotePath'
tar -xf /tmp/credbusiness.tar -C '$RemotePath'
cd '$RemotePath'
mkdir -p nginx/conf.d nginx/certbot/www nginx/certbot/conf
if [ ! -f .env ]; then
  cp .env.example .env
  echo 'Arquivo .env criado em $RemotePath/.env. Edite os segredos e rode o deploy novamente.'
  exit 20
fi
docker compose up -d --build postgres app nginx
docker compose ps
"@

ssh $target $remoteCommands

if ($EnableSsl) {
  if ([string]::IsNullOrWhiteSpace($LetsEncryptEmail)) {
    throw "Informe -LetsEncryptEmail para habilitar SSL."
  }

  ssh $target "cd '$RemotePath' && LETSENCRYPT_EMAIL='$LetsEncryptEmail' sh scripts/enable-ssl.sh"
}

Write-Host "Deploy enviado para $HostName em $RemotePath"
