set -e
yarn
rm -rf build
npx tsc
pm2 start ecosystem.config.js --only "romay-prod"