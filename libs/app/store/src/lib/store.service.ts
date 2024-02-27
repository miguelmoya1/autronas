import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { defaultDataLoading } from '@autronas/app/shared';
import { STORE_KEYS, Store } from './tools';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _store = new Map<
    keyof Store,
    WritableSignal<Store[keyof Store]>
  >();

  constructor() {
    this.setDefaultValues();
  }

  public get<T extends keyof Store>(key: T): Signal<Store[T]> {
    const signal = this._store.get(key);

    if (!signal) {
      throw new Error(`No signal found for key: ${key}`);
    }

    return signal.asReadonly() as Signal<Store[T]>;
  }

  public set<T extends keyof Store>(key: T, value: Store[T]) {
    const data = this._store.get(key);

    if (!data) {
      throw new Error(`No signal found for key: ${key}`);
    }

    data?.update(() => value);
  }

  private setDefaultValues() {
    this._store.set(STORE_KEYS.TRANSLATE, signal(defaultDataLoading()));
    this._store.set(
      STORE_KEYS.AVAILABLE_LANGUAGES,
      signal(defaultDataLoading()),
    );
    this._store.set(STORE_KEYS.TOKEN, signal(defaultDataLoading()));

    this._store.set(STORE_KEYS.IS_LOGGED, signal(false));
    this._store.set(STORE_KEYS.SOCKET_CONNECTED, signal(false));

    this._store.set(STORE_KEYS.CURRENT_USER, signal(defaultDataLoading()));
  }
}
