import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Attach with @UseGuards(JwtAuthGuard) to require a valid JWT on a route.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
