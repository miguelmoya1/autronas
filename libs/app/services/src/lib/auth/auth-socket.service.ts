import { Injectable, Injector, effect, inject, untracked } from '@angular/core';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class AuthSocketService {
  private readonly _store = inject(StoreService);
  private readonly _socket = inject(Socket);
  private readonly _injector = inject(Injector);

  public async init() {
    effect(
      () => {
        const isLogged = this._store.get(STORE_KEYS.IS_LOGGED);

        const tokenStore = this._store.get(STORE_KEYS.TOKEN);

        untracked(() => {
          if (isLogged() && !tokenStore().loading) {
            this.setOptions();
            this.connect();
          } else {
            this.disconnect();
          }
        });
      },
      { injector: this._injector },
    );
  }

  private connect() {
    if (this._store.get(STORE_KEYS.SOCKET_CONNECTED)()) {
      return;
    }

    this._socket.connect();
    this._store.set(STORE_KEYS.SOCKET_CONNECTED, true);
  }

  private disconnect() {
    if (!this._store.get(STORE_KEYS.SOCKET_CONNECTED)()) {
      return;
    }

    this._socket.disconnect();
    this._store.set(STORE_KEYS.SOCKET_CONNECTED, false);
  }

  private setOptions() {
    this._socket.ioSocket.io.opts.query = {
      authorization: this._store.get(STORE_KEYS.TOKEN)().data,
    };

    this._socket.ioSocket.io.opts.autoConnect = false;
  }
}
