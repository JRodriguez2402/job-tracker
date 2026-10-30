# Job Tracker

![CI](https://github.com/JRodriguez2402/job-tracker/actions/workflows/ci.yml/badge.svg)

Aplicación full-stack para gestionar mis propias postulaciones de empleo: registro cada vacante, la muevo por las etapas del proceso y llevo el seguimiento en un solo lugar. Con autenticación (cada usuario ve solo lo suyo), bilingüe por diseño y desplegada en producción.

> 🔗 **[Ver en vivo](https://job-tracker-phi-jet.vercel.app)** · Usuario de prueba: **demo@demo.com** / **demo1234**

## Funcionalidades

- **Autenticación** con JWT: registro, login y rutas protegidas. Cada usuario ve únicamente sus postulaciones.
- **CRUD** completo: empresa, cargo, enlace, salario, stack, fecha y notas.
- **Etapas** del proceso: Guardada → Aplicada → Screening → Técnica → Oferta → Rechazada.
- **Bilingüe ES/EN** con selector de idioma y persistencia (toda la UI vía i18n).
- **Dashboard** del embudo por etapas y **vista compartida de solo lectura** por enlace.
- Validación de la entrada en el backend con DTOs; diseño responsive y tema claro/oscuro.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Backend | NestJS 11, TypeORM 1 (migraciones), class-validator, JWT + bcrypt |
| Base de datos | PostgreSQL 16 |
| Monorepo | npm workspaces (`apps/web` · `apps/api` · `packages/shared`) |
| Despliegue | Vercel (frontend) · Render (backend) · Neon (base de datos) |

## Estructura

```
job-tracker/
├── apps/
│   ├── api/            # NestJS + TypeORM (API REST, auth, migraciones)
│   └── web/            # Next.js (App Router)
├── packages/
│   └── shared/         # Tipos y enum compartidos (única fuente de verdad)
└── docker-compose.yml  # PostgreSQL local
```

## Correr en local

Requisitos: **Node.js ≥ 20** y un runtime de contenedores (**Colima** o Docker Desktop).

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
colima start            # si usas Colima
docker compose up -d    # Postgres en un contenedor
npm run dev             # levanta front + back
```

- Frontend: <http://localhost:3000> · API: <http://localhost:3001/api>

## Decisiones técnicas

**Por qué NestJS y no las API routes de Next.** Quería un backend con estructura propia (módulos, inyección de dependencias, DTOs, validación declarativa, guards) y una frontera clara con el frontend, más cercano a una arquitectura de producción real.

**Por qué un paquete `shared`.** El tipo de una postulación y el enum de etapas se definen una sola vez y los consumen API y web, así no pueden divergir: un cambio en el tipo rompe la compilación de ambos.

**Autenticación con token en `localStorage`.** Se eligió un JWT Bearer por simplicidad y por el despliegue cross-origin (front y back en dominios distintos). Es consciente del trade-off de XSS; una cookie `httpOnly` sería más robusta y es el siguiente paso natural para endurecer.

**Esquema por migraciones en producción.** En desarrollo se usa `synchronize`, pero producción corre migraciones de TypeORM (nunca auto-esquema contra datos reales).

## Estado y hoja de ruta

- [x] **Hito 1** — CRUD local
- [x] **Hito 2** — Autenticación (JWT, por usuario)
- [x] **Hito 3** — Despliegue a producción (link vivo + usuario demo)
- [x] **Hito 4** — Bilingüe completo (ES/EN con selector y persistencia)
- [x] **Hito 5** — Dashboard del embudo + vista compartida de solo lectura
- [x] **Hito 6** — Tests de la lógica crítica + CI (GitHub Actions)

---

Construido con fines de aprendizaje y portafolio.
