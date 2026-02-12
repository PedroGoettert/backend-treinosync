# syntax=docker/dockerfile:1
FROM node:20-slim

WORKDIR /app

# Habilita pnpm via Corepack
RUN corepack enable

# Dependências do sistema (útil pro Prisma em alguns cenários)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copia manifests e instala deps primeiro (cache)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copia o restante do código
COPY . .

EXPOSE 3333

CMD ["pnpm", "dev"]
