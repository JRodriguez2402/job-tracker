import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    // Load environment variables (.env) and expose them app-wide.
    ConfigModule.forRoot({ isGlobal: true }),

    // Configure the Postgres connection asynchronously, reading from the env.
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT') ?? 5432),
        username: config.get<string>('DB_USER', 'jobtracker'),
        password: config.get<string>('DB_PASSWORD', 'jobtracker'),
        database: config.get<string>('DB_NAME', 'jobtracker'),
        autoLoadEntities: true, // pick up entities registered by feature modules
        // Dev only: auto-creates/updates tables. Never true against real data.
        synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
      }),
    }),
    ApplicationsModule,
  ],
})
export class AppModule {}
