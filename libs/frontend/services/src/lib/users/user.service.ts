import { Injectable, effect, inject, untracked } from '@angular/core';
import { defaultDataLoading } from '@autronas/frontend/shared';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _store = inject(StoreService);
  private readonly _userApiService = inject(UserApiService);

  constructor() {
    this.setDefaultStoreValues();

    effect(() => {
      const isLogged = this._store.get(STORE_KEYS.IS_LOGGED)();

      untracked(() => {
        if (isLogged) {
          this.watch();
        } else {
          this.unwatch();
        }
      });
    });
  }

  private setDefaultStoreValues() {
    this._store.set(STORE_KEYS.CURRENT_USER, defaultDataLoading());
  }

  private async watch() {
    this._store.set(STORE_KEYS.CURRENT_USER, defaultDataLoading());

    await this.setUser();
  }

  private unwatch() {
    this._store.set(STORE_KEYS.CURRENT_USER, defaultDataLoading());
  }

  private async setUser() {
    const response = await this._userApiService.getMe();

    this._store.set(STORE_KEYS.CURRENT_USER, response.serialize());
  }
}
