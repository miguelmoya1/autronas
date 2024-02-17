import { Data } from '@autronas/app/shared';

export enum STORE_KEYS {
  GAME_ID = 'gameID',

  CHARACTERS = 'characters',
  USERS = 'users',
  GAMES = 'games',
  CURRENT_GAME = 'currentGame',
  GAME_REQUESTS = 'gameRequests',
  CURRENT_VOTE = 'currentVote',

  TRANSLATE = 'translate',
  AVAILABLE_LANGUAGES = 'availableLanguages',

  TOKEN = 'token',
  IS_LOGGED = 'isLogged',

  SOCKET_CONNECTED = 'socketConnected',
  SOCKET_GAME_CONNECTED = 'socketGameConnected',
}

export interface Store {
  [STORE_KEYS.TRANSLATE]: Data<{ [key: string]: string }>;
  [STORE_KEYS.AVAILABLE_LANGUAGES]: Data<string[]>;
  [STORE_KEYS.TOKEN]: Data<string>;
  [STORE_KEYS.IS_LOGGED]: boolean;
  [STORE_KEYS.SOCKET_CONNECTED]: boolean;
  [STORE_KEYS.SOCKET_GAME_CONNECTED]: boolean;
}
