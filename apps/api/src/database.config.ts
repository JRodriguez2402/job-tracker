import type { DataSourceOptions } from 'typeorm';
import { ApplicationEntity } from './applications/application.entity';
import { UserEntity } from './auth/user.entity';

// Single source of the TypeORM connection config, shared by the Nest app
// (app.module) and the migration CLI (data-source.ts).
//
// - DATABASE_URL (managed Postgres like Neon) wins over the discrete DB_* vars.
// - SSL is required by most managed providers -> gate it with DB_SSL.
// - Local dev uses DB_SYNCHRONIZE=true; production uses DB_MIGRATIONS_RUN=true
//   with synchronize off, so the schema only changes through reviewed migrations.
export function databaseOptions(): DataSourceOptions {
  const useSsl = process.env.DB_SSL === 'true';

  const base = {
    type: 'postgres' as const,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    entities: [ApplicationEntity, UserEntity],
    migrations: [__dirname + '/migrations/*.{js,ts}'],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  };

  if (process.env.DATABASE_URL) {
    return { ...base, url: process.env.DATABASE_URL };
  }

  return {
    ...base,
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'jobtracker',
    password: process.env.DB_PASSWORD ?? 'jobtracker',
    database: process.env.DB_NAME ?? 'jobtracker',
  };
}
