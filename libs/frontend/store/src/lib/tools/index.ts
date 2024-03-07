import { Data } from '@autronas/frontend/shared';
import { Client, Paginated, Paginator, User } from '@autronas/core/interfaces';

export enum STORE_KEYS {
  TRANSLATE = 'translate',
  AVAILABLE_LANGUAGES = 'availableLanguages',

  IS_LOGGED_LOADING = 'isLoggedLoading',
  TOKEN = 'token',
  IS_LOGGED = 'isLogged',

  SOCKET_CONNECTED = 'socketConnected',

  CURRENT_USER = 'currentUser',
  ALL_CLIENTS_PAGINATED = 'allClientsPaginated',
  CLIENTS_PAGINATOR = 'clientsPaginator',
}

export interface Store {
  [STORE_KEYS.TRANSLATE]: Data<{ [key: string]: string }>;
  [STORE_KEYS.AVAILABLE_LANGUAGES]: Data<string[]>;
  [STORE_KEYS.TOKEN]: string | null;
  [STORE_KEYS.IS_LOGGED]: boolean | null;
  [STORE_KEYS.IS_LOGGED_LOADING]: boolean;
  [STORE_KEYS.SOCKET_CONNECTED]: boolean;

  [STORE_KEYS.CURRENT_USER]: Data<User>;

  [STORE_KEYS.ALL_CLIENTS_PAGINATED]: Data<Paginated<Client>>;
  [STORE_KEYS.CLIENTS_PAGINATOR]: Paginator;
}
