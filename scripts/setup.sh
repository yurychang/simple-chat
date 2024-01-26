pnpm install

cd apps/chat-server
cp .env.example .env
npx prisma generate
