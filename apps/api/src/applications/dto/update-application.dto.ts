import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';

// Takes the create DTO and makes every field optional while keeping its
// validators (which only run when a field is present) — i.e. PATCH semantics:
// send only what changes.
export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
