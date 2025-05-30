import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * Data Transfer Object for updating user information
 * Extends CreateUserDto but makes all fields optional
 * This allows partial updates of user data
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
