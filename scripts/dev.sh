set -e
yarn
rm -rf build
npx tsc
cp ./src/utils/swagger.json ./build/utils/swagger.json
pm2 start ecosystem.config.js --only "romay-dev"