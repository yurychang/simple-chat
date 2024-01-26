# Express REST API Template

REST API server template create with Node.js, Express and Typescript.

## Features
- [x] Database connection with **Prisma**
- [x] Manage environment variables with **dotenv**
- [ ] Request validation
- [ ] JWT authentication
- [ ] Unit testing
- [ ] Logging
- [ ] Error handling

## NPM scripts
- `pnpm dev`:  Start the development server.
- `pnpm build`: Build the production version
- `pnpm start`: Start the production server.

## Project Structure
```bash
.
├── prisma
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── services
|   ├── app.ts
|   └── main.ts
└── public
```
