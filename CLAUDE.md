# Job Tracker

Aplicación para gestionar mis propias postulaciones de empleo.
Bilingüe (ES/EN), con roles de dueño e invitado de solo lectura.

## Stack

- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS
- Backend: NestJS + TypeORM
- Base de datos: PostgreSQL
- Auth: JWT
- Despliegue: Vercel (frontend) · Railway (backend + BD)

## Estructura

- `apps/web/`  — Next.js
- `apps/api/`  — NestJS
- `packages/shared/` — tipos compartidos entre front y back

## Comandos

- `npm run dev` — levanta front y back
- `npm run test` — tests
- `npm run lint` — linter
- `docker compose up -d` — Postgres local

## Convenciones

- Indentación de 2 espacios
- Componentes de React en PascalCase, hooks con prefijo `use`
- Los tipos compartidos van en `packages/shared`, nunca duplicados
- Todo texto visible pasa por i18n. Nunca hardcodear strings en la UI
- Los endpoints van en `apps/api/src/<modulo>/<modulo>.controller.ts`
- Toda entrada de la API se valida con DTOs y class-validator
- Los comentarios del código van en inglés; explican el *porqué*, no narran cada línea

## Cosas que no debes hacer

- No usar `any` en TypeScript
- No hacer commit de `.env`
- No instalar dependencias nuevas sin decírmelo primero

## Estado actual

Hito 1 — CRUD local del backend (NestJS + Postgres) funcionando. Frontend en construcción.

## Pendientes

- [ ] i18n completo
- [ ] Vista compartida de solo lectura
- [ ] Tests del servicio de aplicaciones