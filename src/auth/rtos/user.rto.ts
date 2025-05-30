import { UserDocument } from 'src/auth/models/user.model';

/**
 * Response Transfer Object for user data
 * Used to transform and return user information in API responses
 * Excludes sensitive data like password and access token
 */
export class UserRto {
  constructor(
    /** User's unique identifier */
    public id: string,
    /** User's username */
    public username: string,
    /** User's email address */
    public email: string,
    /** User's first name */
    public firstName: string,
    /** User's last name */
    public lastName: string,
    /** User's phone number */
    public phoneNumber: string,
    /** Account creation timestamp */
    public createdAt: Date,
    /** Last update timestamp */
    public updatedAt: Date,
  ) {}

  /**
   * Creates a UserRto instance from a UserDocument
   * Transforms the MongoDB document into a safe response object
   * @param document - The MongoDB user document
   * @returns A new UserRto instance
   */
  static fromDocument(document: UserDocument): UserRto {
    return new UserRto(
      document._id.toString(),
      document.username,
      document.email,
      document.firstName,
      document.lastName,
      document.phoneNumber,
      document.createdAt,
      document.updatedAt,
    );
  }
}
