import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Store } from './tools';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _store = new Map<keyof Store, WritableSignal<Store[keyof Store]>>();

  public get<T extends keyof Store>(key: T): Signal<Store[T]> {
    const signal = this._store.get(key);

    if (!signal) {
      throw new Error(`Store key ${key} not found`);
    }

    return signal.asReadonly() as Signal<Store[T]>;
  }

  public set<T extends keyof Store>(key: T, value: Store[T]) {
    const data = this._store.get(key);

    if (!data) {
      this._store.set(key, signal(value));
    }

    data?.update(() => value);
  }
}
