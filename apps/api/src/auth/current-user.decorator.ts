import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '@job-tracker/shared';

// Reads the user that JwtStrategy.validate() attached to the request.
// Usage: someHandler(@CurrentUser() user: AuthUser) { ... }
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    return ctx.switchToHttp().getRequest<{ user: AuthUser }>().user;
  },
);
