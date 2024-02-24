import { AuthService, UsersService } from '@autronas/backend/services';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginGoogleCommand } from '../impl/login-google.command';

@CommandHandler(LoginGoogleCommand)
export class LoginGoogleHandler implements ICommandHandler<LoginGoogleCommand> {
  private readonly logger = new Logger(LoginGoogleHandler.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async execute(command: LoginGoogleCommand) {
    this.logger.debug('Handler...');

    const { user } = command;

    if (process.env['NODE_ENV'] === 'production') {
      await this.authService.verifyGoogleToken(user.idToken);
    }

    let userDB = await this.userService.getByEmail(user.email);

    if (!userDB) {
      await this.userService.createByGoogle(user);

      userDB = await this.userService.getByEmail(user.email);
    }

    if (!userDB) {
      throw new HttpException(
        'CANNOT_CREATE_USER',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { token: this.authService.sign(userDB) };
  }
}
