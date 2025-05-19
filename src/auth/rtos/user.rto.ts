import { UserDocument } from 'src/auth/models/user.model';

export class UserRto {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

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
