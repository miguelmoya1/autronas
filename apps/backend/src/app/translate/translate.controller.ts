import { TranslateEntity } from '@autronas/backend/entities';
import {
  TranslateGetAvailableQuery,
  TranslateGetQuery,
} from '@autronas/backend/queries';
import { Controller, Get, Param, Req } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('translate')
@ApiTags('Translate')
export class TranslateController {
  constructor(protected readonly queryBuss: QueryBus) {}

  @Get()
  @ApiOperation({
    summary: 'The translations',
    description: 'Get the translations based on the language of the request',
  })
  @ApiOkResponse({ type: TranslateEntity })
  async translate(@Req() request?: Request) {
    const command = new TranslateGetQuery(request);

    return await this.queryBuss.execute(command);
  }

  @Get('languages')
  @ApiOperation({
    summary: 'The available languages',
    description: 'Get the available languages as array of strings',
  })
  @ApiOkResponse({ type: [String] })
  async getLanguages() {
    const command = new TranslateGetAvailableQuery();

    return await this.queryBuss.execute(command);
  }

  @Get(':language')
  @ApiOperation({
    summary: 'The translations for a specific language',
    description: 'Get the translations for a specific language',
  })
  @ApiOkResponse({ type: TranslateEntity })
  async getLanguage(
    @Req() request?: Request,
    @Param('language') language?: string,
  ) {
    const command = new TranslateGetQuery(request, language);

    return await this.queryBuss.execute(command);
  }
}
