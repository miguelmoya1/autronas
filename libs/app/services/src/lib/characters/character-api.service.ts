import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiErrorResponse, ApiOkResponse, DataFromApi } from '@sleep-valley/app/shared';
import {
  Character,
  CharacterKillByWitch,
  CharacterRevive,
  CharacterSeer,
  CharacterWitchSkip,
} from '@sleep-valley/core/interfaces';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private readonly _URL = '/characters';
  private readonly _http = inject(HttpClient);

  public async getAllInGame(gameID: string) {
    return await firstValueFrom(
      this._http.get<Character[]>(`${this._URL}/game/${gameID}`).pipe(
        map((res) => new ApiOkResponse(res)),
        catchError((err) => of(new ApiErrorResponse(err))),
        map((res) => new DataFromApi(res)),
      ),
    );
  }

  public async getToVote(gameID: string): Promise<DataFromApi<Character[]>> {
    return await firstValueFrom(
      this._http.get<Character[]>(`${this._URL}/game/${gameID}/vote`).pipe(
        map((res) => new ApiOkResponse(res)),
        catchError((err) => of(new ApiErrorResponse(err))),
        map((res) => new DataFromApi(res)),
      ),
    );
  }

  public async reviveByWitch(characterRevive: CharacterRevive) {
    return await firstValueFrom(
      this._http.post<Character>(`${this._URL}/revive`, characterRevive).pipe(
        map((res) => new ApiOkResponse(res)),
        catchError((err) => of(new ApiErrorResponse(err))),
        map((res) => new DataFromApi(res)),
      ),
    );
  }

  public async killByWitch(characterRevive: CharacterKillByWitch) {
    return await firstValueFrom(
      this._http.post<Character>(`${this._URL}/kill`, characterRevive).pipe(
        map((res) => new ApiOkResponse(res)),
        catchError((err) => of(new ApiErrorResponse(err))),
        map((res) => new DataFromApi(res)),
      ),
    );
  }

  public async skipByWitch(characterSkip: CharacterWitchSkip) {
    return await firstValueFrom(
      this._http.post<Character>(`${this._URL}/skip`, characterSkip).pipe(
        map((res) => new ApiOkResponse(res)),
        catchError((err) => of(new ApiErrorResponse(err))),
        map((res) => new DataFromApi(res)),
      ),
    );
  }

  public async seeBySeer(characterSeer: CharacterSeer) {
    return await firstValueFrom(
      this._http.post<Character>(`${this._URL}/seer`, characterSeer).pipe(
        map((res) => new ApiOkResponse(res)),
        catchError((err) => of(new ApiErrorResponse(err))),
        map((res) => new DataFromApi(res)),
      ),
    );
  }
}
