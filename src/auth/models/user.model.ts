import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * User Document Schema
 * Represents a user in the system with their personal and authentication information.
 * Uses Mongoose schema with timestamps enabled and version key disabled.
 */
@Schema({ timestamps: true, collection: 'users', versionKey: false })
export class UserDocument extends Document {
  /** MongoDB document ID */
  declare _id: Types.ObjectId;

  /** User's first name */
  @Prop({ required: true })
  firstName: string;

  /** User's last name */
  @Prop({ required: true })
  lastName: string;

  /** User's email address (unique) */
  @Prop({ required: true, unique: true })
  email: string;

  /** User's username (unique) */
  @Prop({ required: true, unique: true })
  username: string;

  /** User's hashed password */
  @Prop({ required: true })
  password: string;

  /** User's phone number */
  @Prop({ required: true })
  phoneNumber: string;

  /** Document creation timestamp */
  @Prop({ type: Date })
  createdAt: Date;

  /** Document last update timestamp */
  @Prop({ type: Date })
  updatedAt: Date;

  /** JWT access token for authentication */
  @Prop({ types: String })
  accessToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
