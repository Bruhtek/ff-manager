FROM node:18-alpine
LABEL authors="Bruhtek"

WORKDIR /app
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install
RUN npm run build

CMD ["node", "build"]
