import { Data } from '@autronas/app/shared';
import { User } from '@autronas/core/interfaces';

export enum STORE_KEYS {
  TRANSLATE = 'translate',
  AVAILABLE_LANGUAGES = 'availableLanguages',

  TOKEN = 'token',
  IS_LOGGED = 'isLogged',

  SOCKET_CONNECTED = 'socketConnected',

  CURRENT_USER = 'currentUser',
}

export interface Store {
  [STORE_KEYS.TRANSLATE]: Data<{ [key: string]: string }>;
  [STORE_KEYS.AVAILABLE_LANGUAGES]: Data<string[]>;
  [STORE_KEYS.TOKEN]: Data<string>;
  [STORE_KEYS.IS_LOGGED]: boolean;
  [STORE_KEYS.SOCKET_CONNECTED]: boolean;

  [STORE_KEYS.CURRENT_USER]: Data<User>;
}
