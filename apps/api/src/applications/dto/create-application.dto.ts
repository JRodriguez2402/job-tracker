import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApplicationStage, CreateApplicationInput } from '@job-tracker/shared';

// Defines the exact payload accepted on create, plus its validation rules.
// `implements CreateApplicationInput` keeps it aligned with the shared type.
//
// No field defaults on purpose: defaults live in the entity/DB (a single source).
// Defaulting here would break PATCH, since an omitted field would arrive as
// null/[] and overwrite existing data (see UpdateApplicationDto).
export class CreateApplicationDto implements CreateApplicationInput {
  @IsString()
  @MaxLength(200)
  company: string;

  @IsString()
  @MaxLength(200)
  role: string;

  @IsOptional()
  @IsUrl()
  url: string | null;

  @IsOptional()
  @IsString()
  salary: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // every array element must be a string
  stack: string[];

  @IsOptional()
  @IsISO8601() // ISO date, 'YYYY-MM-DD'
  appliedDate: string | null;

  @IsOptional()
  @IsEnum(ApplicationStage) // if present, must be one of the enum values
  stage: ApplicationStage;

  @IsOptional()
  @IsString()
  notes: string | null;
}
