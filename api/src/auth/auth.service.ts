import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CryptoService } from '@/crypt/crypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user: User | null = await this.usersService.findEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (this.cryptoService.decrypt(user.password) !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, name: user.name, email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
