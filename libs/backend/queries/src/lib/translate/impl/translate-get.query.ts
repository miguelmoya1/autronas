import { Request } from 'express';

export class TranslateGetQuery {
  constructor(
    public readonly request: Request,
    public readonly language?: string,
  ) {}
}
