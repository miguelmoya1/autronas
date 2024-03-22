import { EffectRef, Injectable, Injector, effect, inject, untracked } from '@angular/core';
import { Paginator } from '@autronas/core/interfaces';
import { TABLE_KEYS } from '@autronas/frontend/helpers';
import { defaultDataLoading } from '@autronas/frontend/shared';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { Preferences } from '@capacitor/preferences';
import { ClientApiService } from './client-api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly _store = inject(StoreService);
  private readonly _clientApiService = inject(ClientApiService);
  private readonly _injector = inject(Injector);

  private declare effectRef?: EffectRef;

  constructor() {
    this.setInitialStoreValues();

    this.init();

    effect(async () => {
      const needRefresh = this._store.get(STORE_KEYS.CLIENTS_NEED_REFRESH)();

      if (needRefresh) {
        untracked(async () => {
          await this.setClients();

          this._store.set(STORE_KEYS.CLIENTS_NEED_REFRESH, false);
        });
      }
    });

    effect(() => {
      const clientID = this._store.get(STORE_KEYS.CLIENT_ID)();
      const isLogged = this._store.get(STORE_KEYS.IS_LOGGED)();

      if (clientID && isLogged) {
        untracked(async () => {
          await this.setClient(clientID);
        });
      }
    });
  }

  private setInitialStoreValues() {
    this._store.set(STORE_KEYS.CLIENT_TABLE_HEADERS, [
      'name',
      'surname',
      'email',
      'personalID',
      'isBusiness',
      'phoneNumber',
      'createdAt',
    ]);
    this._store.set(STORE_KEYS.CLIENT_ID, null);
    this._store.set(STORE_KEYS.CLIENTS_NEED_REFRESH, false);
  }

  private async init() {
    try {
      const { value } = await Preferences.get({ key: TABLE_KEYS.CLIENTS });
      const paginator = value ? JSON.parse(value) : { offset: 0, limit: 10 };

      this._store.set(STORE_KEYS.CLIENTS_PAGINATOR, paginator);
    } catch {
      this._store.set(STORE_KEYS.CLIENTS_PAGINATOR, { offset: 0, limit: 10 });
    }

    effect(
      () => {
        const isLogged = this._store.get(STORE_KEYS.IS_LOGGED)();

        untracked(() => {
          if (isLogged) {
            this.watchPaginator();
          } else {
            this.unwatchPaginator();
          }
        });
      },
      { injector: this._injector },
    );
  }

  private async watchPaginator() {
    this._store.set(STORE_KEYS.ALL_CLIENTS_PAGINATED, defaultDataLoading());

    this.unwatchPaginator();

    this.effectRef = effect(
      async () => {
        await this.setClients();
      },
      {
        allowSignalWrites: true,
        injector: this._injector,
        manualCleanup: true,
      },
    );
  }

  private unwatchPaginator() {
    this._store.set(STORE_KEYS.ALL_CLIENTS_PAGINATED, defaultDataLoading());

    if (this.effectRef) {
      this.effectRef.destroy();
    }
  }

  private async setClients() {
    this._store.set(STORE_KEYS.ALL_CLIENTS_PAGINATED, defaultDataLoading());

    const paginator = this._store.get(STORE_KEYS.CLIENTS_PAGINATOR)();

    const response = await this._clientApiService.getAll(paginator as Required<Paginator>);

    this._store.set(STORE_KEYS.ALL_CLIENTS_PAGINATED, response.serialize());
  }

  public async setClient(clientID: string) {
    this._store.set(STORE_KEYS.CLIENT, defaultDataLoading());

    const response = await this._clientApiService.getOne(clientID);

    this._store.set(STORE_KEYS.CLIENT, response.serialize());
  }
}
