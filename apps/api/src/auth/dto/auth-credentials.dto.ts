import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthCredentials } from '@job-tracker/shared';

// Shared by register and login: both accept an email and a password.
export class AuthCredentialsDto implements AuthCredentials {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72) // bcrypt only hashes the first 72 bytes; reject longer inputs
  password: string;
}
