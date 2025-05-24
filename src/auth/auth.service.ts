import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/auth/models/user.model';
import { ErrorMessage } from 'src/enums/error-message.enum';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRto } from './rtos/user.rto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({
      email,
    });

    return user;
  }

  async findByEmailAndThrow(email: string): Promise<UserDocument> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }

    return user;
  }

  async register(userData: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({
      email: userData.email,
    });

    if (existingUser) {
      throw new BadRequestException(ErrorMessage.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);
    }

    const payload = { sub: user._id.toString(), email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    await this.userModel.updateOne({ _id: user._id }, { accessToken });

    return accessToken;
  }

  async logout(userId: string): Promise<void> {
    const profileObjectId = new Types.ObjectId(userId);

    await this.userModel.updateOne(
      { _id: profileObjectId },
      { accessToken: null },
    );
  }

  async findUserById(userId: string): Promise<UserRto> {
    const profileObjectId = new Types.ObjectId(userId);
    const user = await this.userModel.findOne({ _id: profileObjectId });

    if (!user) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    return UserRto.fromDocument(user);
  }

  async updateUser(userId: string, userDto: UpdateUserDto): Promise<UserRto> {
    const profileObjectId = new Types.ObjectId(userId);

    const user = await this.userModel.findOneAndUpdate(
      { _id: profileObjectId },
      userDto,
      { new: true },
    );

    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }

    return UserRto.fromDocument(user);
  }
}
