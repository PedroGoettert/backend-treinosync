Estrutura de pasta

backend/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
│
├─ src/
│  ├─ server.ts
│
│  ├─ plugins/
│  │  ├─ db.ts            # Prisma client / conexão
│  │  └─ auth.ts          # Better Auth (plugin fastify)
│  │
│  ├─ config/
│  │  └─ env.ts           # leitura/validação de env (opcional, mas recomendado)
│  │
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.routes.ts
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.service.ts
│  │  │  └─ auth.schemas.ts
│  │  │
│  │  ├─ students/
│  │  │  ├─ students.routes.ts
│  │  │  ├─ students.controller.ts
│  │  │  ├─ students.service.ts
│  │  │  ├─ students.repository.ts
│  │  │  └─ students.schemas.ts
│  │  │
│  │  ├─ exercises/
│  │  │  ├─ exercises.routes.ts
│  │  │  ├─ exercises.controller.ts
│  │  │  ├─ exercises.service.ts
│  │  │  ├─ exercises.repository.ts
│  │  │  └─ exercises.schemas.ts
│  │  │
│  │  ├─ plans/
│  │  │  ├─ plans.routes.ts
│  │  │  ├─ plans.controller.ts
│  │  │  ├─ plans.service.ts
│  │  │  ├─ plans.repository.ts
│  │  │  └─ plans.schemas.ts
│  │  │
│  │  └─ checkins/
│  │     ├─ checkins.routes.ts
│  │     ├─ checkins.controller.ts
│  │     ├─ checkins.service.ts
│  │     ├─ checkins.repository.ts
│  │     └─ checkins.schemas.ts
│  │
│  └─ shared/
│     ├─ errors/
│     │  └─ AppError.ts
│     └─ utils/
│        └─ dates.ts
│
├─ .env.example
├─ docker-compose.yml
├─ Dockerfile
├─ tsconfig.json
├─ package.json
└─ pnpm-lock.yaml