import { signal } from '@angular/core';
import { defaultDataLoading } from '@autronas/frontend/shared';
import { STORE_KEYS } from '../tools';

export class StoreService {
  public get = jest.fn((value: STORE_KEYS) => this.getData(value));
  public set = jest.fn();

  private getData = (value: STORE_KEYS) => {
    switch (value) {
      case STORE_KEYS.SOCKET_CONNECTED:
        return signal(false);

      case STORE_KEYS.TRANSLATE:
        return signal(defaultDataLoading());
      case STORE_KEYS.AVAILABLE_LANGUAGES:
        return signal(defaultDataLoading());

      case STORE_KEYS.TOKEN:
        return signal(null);
      case STORE_KEYS.IS_LOGGED:
        return signal(false);
      case STORE_KEYS.IS_LOGGED_LOADING:
        return signal(true);

      case STORE_KEYS.CURRENT_USER:
        return signal(defaultDataLoading());

      case STORE_KEYS.ALL_CLIENTS_PAGINATED:
        return signal(defaultDataLoading());

      case STORE_KEYS.CLIENTS_PAGINATOR:
        return signal({ offset: 0, limit: 10 });

      case STORE_KEYS.CLIENTS_NEED_REFRESH:
        return signal(false);
      case STORE_KEYS.CLIENT_TABLE_HEADERS:
        return signal(['name', 'surname', 'email', 'personalID', 'isBusiness', 'phoneNumber', 'createdAt']);

      case STORE_KEYS.CLIENT_ID:
        return signal(null);
      case STORE_KEYS.CLIENT:
        return signal(defaultDataLoading());
    }
  };
}
