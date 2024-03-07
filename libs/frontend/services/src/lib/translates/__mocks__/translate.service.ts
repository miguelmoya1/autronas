import { signal } from '@angular/core';
import { defaultDataLoading } from '@autronas/frontend/shared';

export class TranslateService {
  public readonly current = signal(defaultDataLoading());
  public readonly availableLanguages = signal([]);

  init = jest.fn();

  changeLanguage = jest.fn(() => Promise.resolve());
  setAvailableLanguages = jest.fn(() => Promise.resolve());
  translate = jest.fn((value: string) => value);
}
