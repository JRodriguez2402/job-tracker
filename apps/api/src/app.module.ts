import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from './database.config';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [
    // Load environment variables (.env) and expose them app-wide.
    ConfigModule.forRoot({ isGlobal: true }),

    // databaseOptions() reads process.env, which ConfigModule has populated by
    // the time this factory runs. It supports DATABASE_URL + SSL (production)
    // or the discrete DB_* vars (local dev).
    TypeOrmModule.forRootAsync({ useFactory: () => databaseOptions() }),

    ApplicationsModule,
    AuthModule,
  ],
})
export class AppModule {}
