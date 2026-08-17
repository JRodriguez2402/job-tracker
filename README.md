# Job Tracker

Aplicación full-stack para gestionar mis propias postulaciones de empleo: registro cada vacante, la muevo por las etapas del proceso y llevo el seguimiento en un solo lugar. Bilingüe por diseño (ES/EN) y construida como pieza de portafolio para respaldar con código real lo que dice mi CV.

> 🔗 **Demo en vivo:** _próximamente (Hito 3 — despliegue)._

## Funcionalidades (Hito 1)

- CRUD completo de postulaciones: empresa, cargo, enlace, salario, stack, fecha y notas.
- Etapas del proceso: Guardada → Aplicada → Screening → Técnica → Oferta → Rechazada.
- Interfaz en español, con **toda** la UI saliendo de un diccionario i18n (lista para inglés).
- Validación de la entrada en el backend con DTOs.
- Diseño responsive (móvil y escritorio) y soporte de tema claro/oscuro.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Backend | NestJS 11, TypeORM 1, class-validator |
| Base de datos | PostgreSQL 16 |
| Monorepo | npm workspaces (`apps/web` · `apps/api` · `packages/shared`) |
| Infra local | Docker Compose (Colima) |

## Estructura

```
job-tracker/
├── apps/
│   ├── api/            # NestJS + TypeORM (API REST)
│   └── web/            # Next.js (App Router)
├── packages/
│   └── shared/         # Tipos y enum compartidos (única fuente de verdad)
└── docker-compose.yml  # PostgreSQL local
```

## Correr en local

Requisitos: **Node.js ≥ 20** y un runtime de contenedores (**Colima** o Docker Desktop).

```bash
# 1. Instalar dependencias (desde la raíz del monorepo)
npm install

# 2. Variables de entorno
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 3. Base de datos (Postgres en un contenedor)
colima start          # si usas Colima
docker compose up -d

# 4. Levantar front + back a la vez
npm run dev
```

- Frontend: <http://localhost:3000>
- API: <http://localhost:3001/api>

## Decisiones técnicas

**Por qué NestJS y no las API routes de Next.** Quería un backend con estructura propia (módulos, inyección de dependencias, DTOs, validación declarativa) y una frontera clara entre front y back, más cercano a una arquitectura de producción real.

**Por qué un paquete `shared`.** El tipo de una postulación y el enum de etapas se definen una sola vez en `packages/shared` y los consumen tanto la API como la web. Así front y back no pueden divergir: un cambio en el tipo rompe la compilación de ambos si no se actualizan a la vez.

**Por qué i18n desde el día uno.** Aunque hoy solo hay español, todo el texto visible sale de un diccionario. Agregar inglés (Hito 4) será sumar un diccionario, no reescribir la interfaz.

**Server Components por defecto.** La lista se renderiza en el servidor (rápida, sin JavaScript de más); solo las piezas interactivas (borrar, formulario) son Client Components.

## Estado y hoja de ruta

- [x] **Hito 1 — CRUD local** (este)
- [ ] Hito 2 — Autenticación (JWT; cada usuario ve solo lo suyo)
- [ ] Hito 3 — Despliegue a producción (link vivo + usuario demo)
- [ ] Hito 4 — Bilingüe completo (ES/EN con rutas y selector)
- [ ] Hito 5 — Dashboard del embudo + vista compartida de solo lectura (roles)
- [ ] Hito 6 — Tests de la lógica crítica + CI

---

Construido con fines de aprendizaje y portafolio.
