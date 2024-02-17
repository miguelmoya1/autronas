import { Injectable, Injector, effect, inject } from '@angular/core';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { Events } from '@sleep-valley/core/enums';
import { ShouldRefresh } from '@sleep-valley/core/interfaces';
import { Socket } from 'ngx-socket-io';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameSocketService {
  private readonly _gameUpdated = new Subject<void>();
  private readonly _gamesUpdated = new Subject<void>();
  private readonly _socket = inject(Socket);
  private readonly _store = inject(StoreService);
  private declare _subscription?: Subscription;
  private readonly injector = inject(Injector);
  private declare oldGameID?: string;

  public readonly gameUpdated = this._gameUpdated.asObservable();
  public readonly gamesUpdated = this._gamesUpdated.asObservable();

  public async init() {
    effect(
      () => {
        const connected = this._store.get(STORE_KEYS.SOCKET_CONNECTED)();
        const gameID = this._store.get(STORE_KEYS.CURRENT_GAME)().data?.id;

        if (connected && gameID) {
          this.join(gameID);
        }

        if (connected && !gameID) {
          this.unsubscribeFromGameUpdates();

          if (this.oldGameID) {
            this.leave(this.oldGameID);
          }
        }

        this.oldGameID = gameID;
      },
      { injector: this.injector },
    );
  }

  private async join(gameID: string) {
    const token = this._store.get(STORE_KEYS.TOKEN)().data;

    if (!token) {
      throw new Error('INVALID_TOKEN');
    }

    try {
      this._socket.emit('join', { gameID, token }, (response: unknown) => {
        console.log('join response', response);
      });
    } catch (error) {
      console.error('join error', error);
    }

    this.subscribeToGameUpdates();
  }

  private async leave(gameID: string) {
    const token = this._store.get(STORE_KEYS.TOKEN)().data;

    if (!token) {
      throw new Error('INVALID_TOKEN');
    }

    this._socket.emit('leave', { gameID, token });
    this.unsubscribeFromGameUpdates();
  }

  private subscribeToGameUpdates() {
    this.unsubscribeFromGameUpdates();

    this._subscription = this._socket.fromEvent<ShouldRefresh>(Events.GAME).subscribe((response) => {
      if (response.game) {
        this._gameUpdated.next();
      }

      if (response.games) {
        this._gamesUpdated.next();
      }
    });
  }

  private unsubscribeFromGameUpdates() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
