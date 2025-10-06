#!/bin/bash

set -e

echo "🚀 Deploying to production server..."

echo "🔨 Building files..."
rm -rf build
npx tsc
echo "🔨 Build complete."

echo "📦 Files built."
rsync -avz --delete build/ root@45.141.78.67:/root/romay_backend/build/
rsync -avz --delete ./src/utils/swagger.json root@45.141.78.67:/root/romay_backend/build/utils/swagger.json
rsync -avz --delete package.json root@45.141.78.67:/root/romay_backend/package.json
echo "📤 Files synced to server."

echo "🔧 Installing dependencies and restarting server..."
ssh root@45.141.78.67 "cd /root/romay_backend && pm2 delete romay_backend || true && yarn && pm2 start build/server.js --name romay_backend && sleep 5 && pm2 log romay_backend --lines 50 --raw --nostream"
echo "🔧 Server restarted."

echo "✅ Deploy done!"
