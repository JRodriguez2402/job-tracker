import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

// Public, read-only view of a user's applications. The owner's id acts as a
// capability token in the share link: possession of the link grants read-only
// access, nothing more. No auth guard here on purpose.
@Controller('share')
export class ShareController {
  constructor(private readonly applications: ApplicationsService) {}

  @Get(':userId') // GET /api/share/:userId
  findShared(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.applications.findAll(userId);
  }
}
