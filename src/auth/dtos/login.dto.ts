import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for user login
 * Contains credentials required for authentication
 */
export class LoginDto {
  /** User's email address used for login */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** User's password for authentication */
  @IsNotEmpty()
  @IsString()
  password: string;
}
