import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiErrorResponse, ApiOkResponse, DataFromApi } from '@sleep-valley/app/shared';
import { User } from '@sleep-valley/core/interfaces';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly _URL = '/users';
  private readonly _http = inject(HttpClient);

  public getAllInGame(gameID: string) {
    return firstValueFrom(
      this._http.get<User[]>(`${this._URL}/game/${gameID}`).pipe(
        map((games) => new ApiOkResponse(games)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }
}