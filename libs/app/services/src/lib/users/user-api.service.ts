import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ApiErrorResponse,
  ApiOkResponse,
  DataFromApi,
} from '@autronas/app/shared';
import { User } from '@autronas/core/interfaces';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly _URL = '/users';
  private readonly _http = inject(HttpClient);

  public getMe() {
    return firstValueFrom(
      this._http.get<User>(`${this._URL}/me`).pipe(
        map((games) => new ApiOkResponse(games)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }
}
