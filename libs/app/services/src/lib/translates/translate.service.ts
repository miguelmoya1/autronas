import { inject, Injectable } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { TranslateApiService } from './translate-api.service';

// TODO: CHANGE WITH TESTING
@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private readonly _translateAPI = inject(TranslateApiService);
  private readonly _store = inject(StoreService);
  private _lastLanguage?: string | null;

  public async init() {
    await this.changeLanguage(null);
    await this.setAvailableLanguages();
  }

  public async changeLanguage(language: string | null) {
    if (this._lastLanguage !== language) {
      this._store.set(STORE_KEYS.TRANSLATE, defaultDataLoading());
      this._lastLanguage = language;

      const localTranslate = await this._translateAPI.getLocale(language || 'en');
      const serverTranslates = await this._translateAPI.get(language || 'en');

      if (serverTranslates.serialize().error) {
        this._store.set(STORE_KEYS.TRANSLATE, {
          loading: false,
          data: localTranslate.serialize().data || {},
          error: null,
        });
      }

      this._store.set(STORE_KEYS.TRANSLATE, {
        loading: false,
        data: {
          ...localTranslate.serialize().data,
          ...serverTranslates.serialize().data,
        },
        error: null,
      });
    }
  }

  private async setAvailableLanguages() {
    const response = await this._translateAPI.getLanguages();

    this._store.set(STORE_KEYS.AVAILABLE_LANGUAGES, response.serialize());
  }
}
