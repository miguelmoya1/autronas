import { Client, Paginated, Paginator, User } from '@autronas/core/interfaces';
import { Data } from '@autronas/frontend/shared';

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
  CLIENTS_NEED_REFRESH = 'clientsNeedRefresh',
  CLIENT_TABLE_HEADERS = 'clientTableHeaders',
  CLIENT_ID = 'clientId',
  CLIENT = 'client',
}

export interface Store {
  [STORE_KEYS.TRANSLATE]: Data<{ [key: string]: string }>;
  [STORE_KEYS.AVAILABLE_LANGUAGES]: Data<string[]>;

  [STORE_KEYS.IS_LOGGED_LOADING]: boolean;
  [STORE_KEYS.TOKEN]: string | null;
  [STORE_KEYS.IS_LOGGED]: boolean | null;

  [STORE_KEYS.SOCKET_CONNECTED]: boolean;

  [STORE_KEYS.CURRENT_USER]: Data<User>;

  [STORE_KEYS.ALL_CLIENTS_PAGINATED]: Data<Paginated<Client>>;
  [STORE_KEYS.CLIENTS_PAGINATOR]: Paginator;
  [STORE_KEYS.CLIENTS_NEED_REFRESH]: boolean;
  [STORE_KEYS.CLIENT_TABLE_HEADERS]: (keyof Client)[];
  [STORE_KEYS.CLIENT_ID]: string | null;
  [STORE_KEYS.CLIENT]: Data<Client>;
}
