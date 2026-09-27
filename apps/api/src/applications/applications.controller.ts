import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '@job-tracker/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

// @UseGuards at the class level protects EVERY route here: no valid JWT → 401.
// Each handler receives the authenticated user and passes their id down, so the
// service can scope every query to that user.
@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applications: ApplicationsService) {}

  @Get() // GET /api/applications
  findAll(@CurrentUser() user: AuthUser) {
    return this.applications.findAll(user.id);
  }

  @Get(':id') // GET /api/applications/:id
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthUser) {
    return this.applications.findOne(id, user.id);
  }

  @Post() // POST /api/applications
  create(@Body() dto: CreateApplicationDto, @CurrentUser() user: AuthUser) {
    return this.applications.create(dto, user.id);
  }

  @Patch(':id') // PATCH /api/applications/:id
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateApplicationDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.applications.update(id, dto, user.id);
  }

  @Delete(':id') // DELETE /api/applications/:id
  @HttpCode(HttpStatus.NO_CONTENT) // 204: deleted, no response body
  remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthUser) {
    return this.applications.remove(id, user.id);
  }
}
