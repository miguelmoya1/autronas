import { Injectable, effect, inject, untracked } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { Subscription } from 'rxjs';
import { UserApiService } from './user-api.service';
import { UserSocketService } from './user-socket.service';

@Injectable({
  providedIn: 'root',
})
export class UsersInGameService {
  public requireAnimation = false;

  private readonly _userSocketService = inject(UserSocketService);
  private readonly _usersApiService = inject(UserApiService);
  private readonly _store = inject(StoreService);

  private declare subscription?: Subscription;

  constructor() {
    effect(() => {
      const gameID = this._store.get(STORE_KEYS.GAME_ID)();

      untracked(() => {
        if (gameID) {
          this.watch(gameID);
        } else {
          this.unwatch();
        }
      });
    });
  }

  private async watch(gameID: string) {
    this._store.set(STORE_KEYS.USERS, defaultDataLoading());

    await this.setUsers(gameID);

    this.watchSocket(gameID);
  }

  private unwatch() {
    this.subscription?.unsubscribe();

    this._store.set(STORE_KEYS.USERS, defaultDataLoading());
    this.requireAnimation = false;
  }

  private watchSocket(gameID: string) {
    this.subscription?.unsubscribe();

    this.subscription = this._userSocketService.usersUpdated.subscribe(async () => {
      this.requireAnimation = true;
      await this.setUsers(gameID);
    });
  }

  private async setUsers(gameID: string) {
    const response = await this._usersApiService.getAllInGame(gameID);

    this._store.set(STORE_KEYS.USERS, response.serialize());
  }
}
