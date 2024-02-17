import { TranslateService } from '@autronas/backend/services';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TranslateGetQuery } from '../impl/translate-get.query';

@QueryHandler(TranslateGetQuery)
export class TranslateGetHandler implements IQueryHandler<TranslateGetQuery> {
  private readonly logger = new Logger(TranslateGetHandler.name);

  constructor(private readonly translateService: TranslateService) {}

  async execute(command: TranslateGetQuery) {
    this.logger.debug('Handler...');

    const { language, request } = command;

    return this.translateService.getTranslate(request, language);
  }
}
