import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiErrorResponse, ApiOkResponse, DataFromApi } from '@sleep-valley/app/shared';
import { Game, GameCreate, User } from '@sleep-valley/core/interfaces';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  private readonly _URL = '/games';
  private readonly _http = inject(HttpClient);

  public getAll() {
    return firstValueFrom(
      this._http.get<Game[]>(`${this._URL}`).pipe(
        map((games) => new ApiOkResponse(games)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public get(gameID: string) {
    return firstValueFrom(
      this._http.get<Game>(`${this._URL}/${gameID}`).pipe(
        map((game) => new ApiOkResponse(game)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public getRequests(gameID: string) {
    return firstValueFrom(
      this._http.get<User[]>(`${this._URL}/${gameID}/requests`).pipe(
        map((games) => new ApiOkResponse(games)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public create(data: GameCreate) {
    return firstValueFrom(
      this._http.post<void>(`${this._URL}`, data).pipe(
        map(() => new ApiOkResponse(true)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public join(code: string) {
    return firstValueFrom(
      this._http.post<void>(`${this._URL}/join`, { code }).pipe(
        map(() => new ApiOkResponse(true)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public accept(gameID: string, userID: string) {
    return firstValueFrom(
      this._http.post<void>(`${this._URL}/accept`, { gameID, userID }).pipe(
        map(() => new ApiOkResponse(true)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public decline(gameID: string, userID: string) {
    return firstValueFrom(
      this._http.post<void>(`${this._URL}/decline`, { gameID, userID }).pipe(
        map(() => new ApiOkResponse(true)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public start(gameID: string) {
    return firstValueFrom(
      this._http.post<void>(`${this._URL}/start`, { gameID }).pipe(
        map(() => new ApiOkResponse(true)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }
}
