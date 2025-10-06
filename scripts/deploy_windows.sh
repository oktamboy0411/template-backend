#!/bin/bash
set -e

SSH_CMD="C:/Windows/System32/OpenSSH/ssh.exe"
SCP_CMD="C:/Windows/System32/OpenSSH/scp.exe"

echo "🚀 Deploying to production server..."

echo "🔨 Building files..."
rm -rf build
npx tsc
echo "🔨 Build complete."

echo "📦 Preparing files..."
# swagger.jsonni buildga copy qilamiz
mkdir -p build/utils
cp ./src/utils/swagger.json build/utils/swagger.json

# buildni arxivlaymiz
tar -czf build.tar.gz build

echo "📤 Sending files to server..."
$SCP_CMD build.tar.gz root@45.141.78.67:/root/romay_backend/build.tar.gz
$SCP_CMD package.json root@45.141.78.67:/root/romay_backend/package.json

# Server ichida build.tar.gz ni ochib tashlaymiz
$SSH_CMD root@45.141.78.67 "cd /root/romay_backend && rm -rf build && mkdir -p build && tar -xzf build.tar.gz && rm build.tar.gz"

echo "🔧 Installing dependencies and restarting server..."
$SSH_CMD root@45.141.78.67 "cd /root/romay_backend && pm2 delete romay_backend || true && yarn && pm2 start build/server.js --name romay_backend"

echo "✅ Deploy done!"
