import { isDevMode } from '@angular/core';

export const server_url = isDevMode()
  ? 'http://localhost:3000'
  : 'https://api.example.com';

export const token_name = 'token';

export const sv_google_login_client_id =
  '377294201518-q3jnjgppo0gnr98ct6vs129qtolj3eb8.apps.googleusercontent.com';
