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
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

// @Controller('applications') => routes live under /api/applications
// (the /api prefix comes from setGlobalPrefix in main.ts).
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applications: ApplicationsService) {}

  @Get() // GET /api/applications
  findAll() {
    return this.applications.findAll();
  }

  @Get(':id') // GET /api/applications/:id
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.applications.findOne(id);
  }

  @Post() // POST /api/applications
  create(@Body() dto: CreateApplicationDto) {
    return this.applications.create(dto);
  }

  @Patch(':id') // PATCH /api/applications/:id
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateApplicationDto,
  ) {
    return this.applications.update(id, dto);
  }

  @Delete(':id') // DELETE /api/applications/:id
  @HttpCode(HttpStatus.NO_CONTENT) // 204: deleted, no response body
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.applications.remove(id);
  }
}
