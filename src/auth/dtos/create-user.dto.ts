import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a new user
 * Contains all required fields for user registration with validation rules
 */
export class CreateUserDto {
  /** Unique username for the user */
  @IsNotEmpty()
  @IsString()
  username: string;

  /** User's password (will be hashed before storage) */
  @IsNotEmpty()
  @IsString()
  password: string;

  /** User's email address (must be unique) */
  @IsNotEmpty()
  @IsString()
  email: string;

  /** User's first name */
  @IsNotEmpty()
  @IsString()
  firstName: string;

  /** User's last name */
  @IsNotEmpty()
  @IsString()
  lastName: string;

  /** User's phone number */
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
