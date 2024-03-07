import { Injectable, inject } from '@angular/core';
import { token_name } from '@autronas/frontend/helpers';
import { AuthApiService } from '@autronas/frontend/services';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { GoogleLogin } from '@autronas/core/interfaces';
import { Preferences } from '@capacitor/preferences';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthDtoService {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _store = inject(StoreService);

  public async login() {
    this._store.set(STORE_KEYS.TOKEN, null);
    this._store.set(STORE_KEYS.IS_LOGGED_LOADING, true);
    this._store.set(STORE_KEYS.IS_LOGGED, false);

    let google: User | undefined = undefined;
    try {
      google = await GoogleAuth.signIn();
    } catch (error) {
      console.log(error);
    }

    if (!google) {
      this._store.set(STORE_KEYS.IS_LOGGED, false);
      this._store.set(STORE_KEYS.IS_LOGGED_LOADING, false);
      this._store.set(STORE_KEYS.TOKEN, null);

      return false;
    }

    const login: GoogleLogin = {
      id: google.id,
      email: google.email,
      givenName: google.givenName,
      familyName: google.familyName,
      imageUrl: google.imageUrl,
      accessToken: google.authentication.accessToken,
      idToken: google.authentication.idToken,
    };

    const response = await this._authApiService.login(login);

    const serialized = response.serialize();

    if (!response.isOk()) {
      this._store.set(STORE_KEYS.IS_LOGGED, false);
      this._store.set(STORE_KEYS.IS_LOGGED_LOADING, false);
      this._store.set(STORE_KEYS.TOKEN, null);

      return false;
    }

    this._store.set(STORE_KEYS.IS_LOGGED, true);
    this._store.set(STORE_KEYS.IS_LOGGED_LOADING, false);
    this._store.set(STORE_KEYS.TOKEN, serialized.data);

    await Preferences.set({
      key: token_name,
      value: serialized.data || '',
    });

    return true;
  }

  public async logout() {
    this._store.set(STORE_KEYS.IS_LOGGED, false);
    this._store.set(STORE_KEYS.TOKEN, null);
    this._store.set(STORE_KEYS.IS_LOGGED_LOADING, false);

    await Preferences.remove({ key: token_name });

    try {
      await GoogleAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  public async rehydrate() {
    const response = await this._authApiService.rehydrate();

    if (!response.isOk()) {
      await this.logout();
      return;
    }

    const serialized = response.serialize();

    this._store.set(STORE_KEYS.IS_LOGGED, true);
    this._store.set(STORE_KEYS.IS_LOGGED_LOADING, false);
    this._store.set(STORE_KEYS.TOKEN, serialized.data);
  }
}
