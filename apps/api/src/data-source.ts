import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { databaseOptions } from './database.config';

// DataSource used by the TypeORM CLI (migration:generate / migration:run).
// `dotenv/config` loads apps/api/.env so the CLI uses the same credentials as
// the app. The Nest app does not use this file; it builds its options directly.
export default new DataSource(databaseOptions());
