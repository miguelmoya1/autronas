import { LoginGoogleCommand } from '@autronas/backend/commands';
import { CurrentUser } from '@autronas/backend/decorators';
import {
  AuthResponseEntity,
  GoogleLoginEntity,
  UserEntity,
} from '@autronas/backend/entities';
import { JwtAuthGuard } from '@autronas/backend/guards';
import { AuthRehydrateQuery } from '@autronas/backend/queries';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('rehydrate')
  @ApiOperation({
    summary: 'Rehydrate the user',
    description: 'Rehydrate the current user',
  })
  @ApiOkResponse({ type: AuthResponseEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async rehydrate(@CurrentUser() user: UserEntity) {
    const command = new AuthRehydrateQuery(user);

    return this.queryBus.execute(command);
  }

  @Post('google')
  @ApiOperation({
    summary: 'Login with Google',
    description: 'Login with Google',
  })
  @ApiOkResponse({ type: AuthResponseEntity })
  async loginGoogle(@Body() google: GoogleLoginEntity) {
    const commandRehydrate = new LoginGoogleCommand(google);
    return this.commandBus.execute(commandRehydrate);
  }
}
