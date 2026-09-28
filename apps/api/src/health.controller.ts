import { Controller, Get } from '@nestjs/common';

// Public, unauthenticated health check. Hosting platforms (e.g. Render) ping it
// to know the service is alive. Served at GET /api/health.
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok' };
  }
}
