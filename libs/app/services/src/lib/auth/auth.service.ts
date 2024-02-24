import { Injectable, inject } from '@angular/core';
import { sv_google_login_client_id, token_name } from '@autronas/app/helpers';
import { STORE_KEYS, StoreService } from '@autronas/app/store';
import { Preferences } from '@capacitor/preferences';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _store = inject(StoreService);

  public async init() {
    GoogleAuth.initialize({
      clientId: sv_google_login_client_id,
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

    const { keys } = await Preferences.keys();

    if (!keys.includes(token_name)) {
      return this._store.set(STORE_KEYS.IS_LOGGED, false);
    }

    const { value } = await Preferences.get({ key: token_name });

    if (!value) {
      return this._store.set(STORE_KEYS.IS_LOGGED, false);
    }

    this._store.set(STORE_KEYS.IS_LOGGED, true);
    this._store.set(STORE_KEYS.TOKEN, {
      loading: false,
      data: value,
      error: null,
    });
  }
}
