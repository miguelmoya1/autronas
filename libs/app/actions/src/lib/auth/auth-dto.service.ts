import { Injectable, inject } from '@angular/core';
import { token_name } from '@autronas/app/helpers';
import { AuthApiService } from '@autronas/app/services';
import { defaultDataLoading } from '@autronas/app/shared';
import { STORE_KEYS, StoreService } from '@autronas/app/store';
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
      key: token_name,
      value: serialized.data || '',
    });

    return true;
  }

  public async logout() {
    this._store.set(STORE_KEYS.IS_LOGGED, false);
    this._store.set(STORE_KEYS.TOKEN, defaultDataLoading());

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

    this._store.set(STORE_KEYS.IS_LOGGED, true);
    this._store.set(STORE_KEYS.TOKEN, response.serialize());
  }
}
