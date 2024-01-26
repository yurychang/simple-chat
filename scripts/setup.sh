pnpm install

cd apps/chat-server
cp .env.sample .env
npx prisma generate
