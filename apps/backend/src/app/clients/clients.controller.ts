import { ClientCreateCommand, ClientUpdateCommand } from '@autronas/backend/commands';
import { CurrentUser } from '@autronas/backend/decorators';
import { ClientCreateDTO, ClientUpdateDTO, PaginatorDTO } from '@autronas/backend/dto';
import { ClientsPaginatedEntity, UserEntity } from '@autronas/backend/entities';
import { JwtAuthGuard } from '@autronas/backend/guards';
import { ClientsGetMyQuery } from '@autronas/backend/queries';
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('Clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get my clients paginated',
    description: 'Get my clients paginated',
  })
  @ApiOkResponse({ type: ClientsPaginatedEntity })
  @ApiBearerAuth()
  async getMe(@CurrentUser() user: UserEntity, @Query() paginator: PaginatorDTO) {
    return this.queryBus.execute(new ClientsGetMyQuery(paginator, user));
  }

  @Post()
  @ApiOperation({
    summary: 'Create a client',
    description: 'Create a client',
  })
  @ApiOkResponse({ type: undefined })
  @ApiBearerAuth()
  async create(@CurrentUser() user: UserEntity, @Body() client: ClientCreateDTO) {
    return this.commandBus.execute(new ClientCreateCommand(client, user));
  }

  @Put(':clientID')
  @ApiOperation({
    summary: 'Update a client',
    description: 'Update a client',
  })
  @ApiOkResponse({ type: undefined })
  @ApiBearerAuth()
  async update(@CurrentUser() user: UserEntity, @Body() client: ClientUpdateDTO, @Param('clientID') clientID: string) {
    return this.commandBus.execute(new ClientUpdateCommand(client, clientID, user));
  }
}
