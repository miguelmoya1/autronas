import { TranslateService } from '@autronas/backend/services';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TranslateGetAvailableQuery } from '../impl/translate-get-available.query';

@QueryHandler(TranslateGetAvailableQuery)
export class TranslateGetAvailableHandler implements IQueryHandler<TranslateGetAvailableQuery> {
  private readonly logger = new Logger(TranslateGetAvailableHandler.name);

  constructor(private readonly translateService: TranslateService) {}

  async execute() {
    this.logger.debug('Handler...');

    return this.translateService.getLanguages();
  }
}
