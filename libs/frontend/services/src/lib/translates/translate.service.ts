import { effect, inject, Injectable, Injector, untracked } from '@angular/core';
import { defaultDataLoading } from '@autronas/frontend/shared';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { Preferences } from '@capacitor/preferences';
import { TranslateApiService } from './translate-api.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private readonly _translateAPI = inject(TranslateApiService);
  private readonly _store = inject(StoreService);
  private _lastLanguage?: string | null;
  private readonly key_preferences = 'language';
  private readonly injector = inject(Injector);

  constructor() {
    this.setDefaultStoreValues();

    this.init();

    this.setAvailableLanguages();
  }

  private setDefaultStoreValues() {
    this._store.set(STORE_KEYS.TRANSLATE, defaultDataLoading());
    this._store.set(STORE_KEYS.AVAILABLE_LANGUAGES, defaultDataLoading());
  }

  private async init() {
    try {
      const { value } = await Preferences.get({ key: this.key_preferences });
      this._store.set(STORE_KEYS.CURRENT_LANGUAGE, value || 'en');
    } catch {
      this._store.set(STORE_KEYS.CURRENT_LANGUAGE, 'en');
    }

    effect(
      () => {
        const language = this._store.get(STORE_KEYS.CURRENT_LANGUAGE)();

        untracked(() => {
          this.changeLanguage(language);
        });
      },
      { injector: this.injector },
    );
  }

  private async changeLanguage(language: string | null) {
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

      if (language) {
        await Preferences.set({ key: this.key_preferences, value: language });
      }
    }
  }

  private async setAvailableLanguages() {
    const response = await this._translateAPI.getLanguages();

    this._store.set(STORE_KEYS.AVAILABLE_LANGUAGES, response.serialize());
  }
}
