import { Injectable, inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { defaultDataLoading } from '@sleep-valley/app/shared';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { GoogleLogin } from '@sleep-valley/core/interfaces';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _store = inject(StoreService);

  public async init() {
    GoogleAuth.initialize({
      clientId: process.env['SV_GOOGLE_LOGIN_CLIENT_ID'],
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

    const { keys } = await Preferences.keys();

    if (!keys.includes(process.env['SV_TOKEN_NAME'] as string)) {
      return this._store.set(STORE_KEYS.IS_LOGGED, false);
    }

    const { value } = await Preferences.get({
      key: process.env['SV_TOKEN_NAME'] as string,
    });

    if (!value) {
      return this._store.set(STORE_KEYS.IS_LOGGED, false);
    }

    this._store.set(STORE_KEYS.IS_LOGGED, true);
    this._store.set(STORE_KEYS.TOKEN, {
      loading: false,
      data: value,
      error: null,
    });

    await this.rehydrate();
  }

  public async login() {
    this._store.set(STORE_KEYS.TOKEN, defaultDataLoading());

    let google: User | undefined = undefined;
    try {
      google = await GoogleAuth.signIn();
    } catch (error) {
      console.log(error);
    }

    if (!google) {
      this._store.set(STORE_KEYS.IS_LOGGED, false);
      this._store.set(STORE_KEYS.TOKEN, {
        loading: false,
        data: null,
        error: {
          message: 'UNAUTHORIZED',
          statusCode: 401,
        },
      });

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
      this._store.set(STORE_KEYS.TOKEN, serialized);

      return false;
    }

    this._store.set(STORE_KEYS.TOKEN, serialized);
    this._store.set(STORE_KEYS.IS_LOGGED, true);

    await Preferences.set({
      key: process.env['SV_TOKEN_NAME'] as string,
      value: serialized.data || '',
    });

    return true;
  }

  public async logout() {
    this._store.set(STORE_KEYS.IS_LOGGED, false);
    this._store.set(STORE_KEYS.TOKEN, defaultDataLoading());

    await Preferences.remove({
      key: process.env['SV_TOKEN_NAME'] as string,
    });

    try {
      await GoogleAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private async rehydrate() {
    this._store.set(STORE_KEYS.TOKEN, defaultDataLoading());

    const response = await this._authApiService.rehydrate();

    if (!response.isOk()) {
      await this.logout();
      return;
    }

    this._store.set(STORE_KEYS.IS_LOGGED, true);
    this._store.set(STORE_KEYS.TOKEN, response.serialize());
  }
}
