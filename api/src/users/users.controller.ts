import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UseGuards,
  Request,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import createUserValidation from '@/users/validations/createUserValidation';
import { CryptoService } from '@/crypt/crypt.service';
import { UsersService } from '@/users/users.service';
import { User } from '@prisma/client';
import { AuthGuard } from '@/auth/auth.guard';
import UpdateBasicInfoValidation from '@/users/validations/UpdateBasicInfoValidation';
import UpdatePasswordValidation from '@/users/validations/UpdatePasswordValidation';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Post()
  @HttpCode(201)
  async store(@Body() userData: User) {
    try {
      createUserValidation.parse(userData);
    } catch (error) {
      throw new BadRequestException(error);
    }
    const data = {
      ...userData,
      password: this.cryptoService.encrypt(userData.password),
      passwordConfirmation: undefined,
    };
    const user = await this.usersService.create(data);

    return {
      ...user,
      password: undefined,
    };
  }

  @Put('/edit/basic')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async basicEdit(@Body() userData: User, @Request() req) {
    try {
      UpdateBasicInfoValidation.parse(userData);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return this.usersService.update(req.user.id, {
      name: userData.name,
      email: userData.email,
    });
  }

  @Put('/edit/password')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async passwordEdit(
    @Body()
    userData: {
      currentPassword: string;
      newPassword: string;
      newPasswordConfirmation: string;
    },
    @Request() req,
  ) {
    try {
      UpdatePasswordValidation.parse(userData);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return this.usersService.update(req.user.id, {
      password: this.cryptoService.encrypt(userData.newPassword),
    });
  }

  @Delete()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async delete(@Request() req) {
    const user: User | null = await this.usersService.find(req.user.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (req.body.password !== this.cryptoService.decrypt(user.password)) {
      throw new BadRequestException('Password incorrect');
    }
    return this.usersService.delete(req.user.id);
  }

  @Post('profile-picture')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const { filePath } = await this.usersService.handleFileUpload(file);
    return this.usersService.update(req.user.id, {
      picture: filePath,
    });
  }
}
