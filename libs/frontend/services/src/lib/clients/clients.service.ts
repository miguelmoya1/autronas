import {
  EffectRef,
  Injectable,
  Injector,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { defaultDataLoading } from '@autronas/frontend/shared';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { Paginator } from '@autronas/core/interfaces';
import { ClientApiService } from './client-api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly _store = inject(StoreService);
  private readonly _clientApiService = inject(ClientApiService);
  private readonly injector = inject(Injector);

  private declare effectRef: EffectRef;

  constructor() {
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

  private async watch() {
    this._store.set(STORE_KEYS.ALL_CLIENTS_PAGINATED, defaultDataLoading());

    this.effectRef = effect(
      async () => {
        this._store.set(STORE_KEYS.ALL_CLIENTS_PAGINATED, defaultDataLoading());

        const paginator = this._store.get(STORE_KEYS.CLIENTS_PAGINATOR)();

        const response = await this._clientApiService.getAll(
          paginator as Required<Paginator>,
        );

        this._store.set(STORE_KEYS.ALL_CLIENTS_PAGINATED, response.serialize());
      },
      {
        allowSignalWrites: true,
        injector: this.injector,
        manualCleanup: true,
      },
    );
  }

  private unwatch() {
    this._store.set(STORE_KEYS.ALL_CLIENTS_PAGINATED, defaultDataLoading());

    if (this.effectRef) {
      this.effectRef.destroy();
    }
  }
}
