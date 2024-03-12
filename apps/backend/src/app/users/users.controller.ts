import { CurrentUser } from '@autronas/backend/decorators';
import { UserEntity } from '@autronas/backend/entities';
import { JwtAuthGuard } from '@autronas/backend/guards';
import { UserGetLoggedQuery } from '@autronas/backend/queries';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get the current user',
    description: 'Get the current user',
  })
  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  async getMe(@CurrentUser() user: UserEntity) {
    return this.queryBus.execute(new UserGetLoggedQuery(user));
  }
}
