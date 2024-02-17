import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiErrorResponse, ApiOkResponse, DataFromApi } from '@sleep-valley/app/shared';
import { Vote, VoteCreate } from '@sleep-valley/core/interfaces';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoteApiService {
  private readonly _URL = '/votes';
  private readonly _http = inject(HttpClient);

  public async getMeInGame(gameID: string) {
    return await firstValueFrom(
      this._http.get<Vote>(`${this._URL}/${gameID}/my`).pipe(
        map((vote) => new ApiOkResponse(vote)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public async create(data: VoteCreate) {
    return await firstValueFrom(
      this._http.post<Vote>(`${this._URL}`, data).pipe(
        map((vote) => new ApiOkResponse(vote)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public async confirm(gameID: string) {
    return await firstValueFrom(
      this._http.post(`${this._URL}/${gameID}/confirm`, {}).pipe(
        map((vote) => new ApiOkResponse(vote)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }
}
