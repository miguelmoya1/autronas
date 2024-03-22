import { effect, inject, Injectable, Injector, untracked } from '@angular/core';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _store = inject(StoreService);
  private readonly key_preferences = 'theme';
  private readonly injector = inject(Injector);

  constructor() {
    this.setDefaultStoreValues();
    this.init();
  }

  private setDefaultStoreValues() {
    const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme';

    this._store.set(STORE_KEYS.CURRENT_THEME, defaultTheme);
  }

  private async init() {
    try {
      const { value } = await Preferences.get({ key: this.key_preferences });

      if (value === 'light-theme' || value === 'dark-theme') {
        this._store.set(STORE_KEYS.CURRENT_THEME, value);
      }
    } catch (error) {
      console.error(error);
    }

    effect(
      () => {
        const theme = this._store.get(STORE_KEYS.CURRENT_THEME)();

        untracked(() => {
          document.body.classList.remove('light-theme', 'dark-theme');
          document.body.classList.add(theme);

          Preferences.set({ key: this.key_preferences, value: theme });
        });
      },
      { injector: this.injector },
    );
  }
}
