import { Injectable, OnModuleInit } from '@nestjs/common';
import { Request } from 'express';
import { TranslateFilesService } from './translate-files.service';

@Injectable()
export class TranslateService implements OnModuleInit {
  private declare languages: Record<
    string,
    {
      [key: string]: string;
    }
  >;
  private readonly languagesAvailable = ['es', 'en'];

  constructor(private readonly translateFilesService: TranslateFilesService) {}

  async onModuleInit() {
    this.languages = await this.translateFilesService.createAll(this.languagesAvailable);
  }

  public getTranslate(req: Request, language?: string) {
    if (language) {
      return this.languages[language] || this.languages['en'];
    }

    let lang = [...new Set(req?.headers['accept-language']?.split(','))]?.[0]?.substring(0, 2).toLocaleLowerCase();

    if (!this.languages[lang]) {
      lang = 'en';
    }

    return this.languages[lang];
  }

  public getLanguages() {
    return this.languagesAvailable;
  }
}
