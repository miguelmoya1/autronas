import { User } from '@autronas/core/interfaces';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private declare client: OAuth2Client;

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit() {
    this.client = new OAuth2Client({
      clientId: process.env['GOOGLE_CLIENT_ID'],
    });
  }

  public decode(token: string) {
    try {
      const decode = this.jwtService.decode(token);
      return decode as Pick<User, 'id'>;
    } catch (e) {
      this.logger.error(`func decode: ${e}`);
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
  }

  public async verifyGoogleToken(idToken: string) {
    try {
      await this.client.verifyIdToken({ idToken });
    } catch (e) {
      this.logger.error(`func verify: ${e}`);
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
  }

  public sign(user: User) {
    const id = user?.id;

    if (!id) {
      throw new HttpException('INVALID_USER', HttpStatus.UNAUTHORIZED);
    }

    return this.jwtService.sign({ id });
  }

  async rehydrate(user: User) {
    return this.sign(user);
  }
}
