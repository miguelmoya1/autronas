import { Injectable, Logger } from '@nestjs/common';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class TranslateExtractorService {
  private readonly logger = new Logger(TranslateExtractorService.name);

  private readonly variableNameRegexp = '([A-Z|\\d]+(?:_[A-Z|\\d]+)*)';

  async getKeys() {
    try {
      const apps = await this.extract('./apps');
      const libs = await this.extract('./libs');

      return [...new Set([...libs, ...apps])].sort();
    } catch (e) {
      this.logger.warn('Frontend not found. Skipping...');
      console.log(e);
    }

    return [];
  }

  private async extract(folder: string) {
    const dir = await readdir(folder);
    const folders = dir.filter((file) => !file.includes('.'));
    const files = dir.filter((file) => file.includes('.ts'));

    const strings: string[] = [];

    const regexps: string[] = [
      //new HttpException('error.invalid_date', HttpStatus.BAD_REQUEST);
      `new HttpException\\('${this.variableNameRegexp}'`,
      //message: 'error.invalid_date',
      ` message: '${this.variableNameRegexp}' `,
      // {{ 'error.invalid_date' | translate }}
      `'${this.variableNameRegexp}' \\| translate`,
      // placeholder="error.invalid_date"
      `placeholder=.${this.variableNameRegexp}.`,
      // [placeholder]="'error.invalid_date' | translate"
      `\\[placeholder\\]='${this.variableNameRegexp}' \\| translate`,
      // todo: check "." and " " in the regexp
      // label="error.invalid_date"
      `label=.${this.variableNameRegexp}.`,
      // [label]="'error.invalid_date' | translate"
      `\\[label\\]='${this.variableNameRegexp}' \\| translate`,
      // .translate('error.invalid_date')
      `\\.translate\\('${this.variableNameRegexp}'\\)`,
      // enums like WEREWOLF = 'WEREWOLF',
      `${this.variableNameRegexp} = '${this.variableNameRegexp}'`,
    ];

    for (const file of files) {
      const content = await readFile(join(folder, file), 'utf8');

      const results = regexps.flatMap((regexp) => this.extractKeys(content, new RegExp(regexp, 'g')));

      strings.push(...results);
    }

    for (const f of folders) {
      strings.push(...(await this.extract(join(folder, f))));
    }

    return [...new Set(strings)].filter(Boolean);
  }

  private extractKeys(file: string, regex: RegExp) {
    const matches = file.match(regex);

    if (!matches) {
      return [];
    }

    return matches.map((match) => match.replace(regex, '$1'));
  }
}
