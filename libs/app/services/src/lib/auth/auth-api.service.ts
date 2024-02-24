import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ApiErrorResponse,
  ApiOkResponse,
  DataFromApi,
} from '@autronas/app/shared';
import { GoogleLogin, LoginResponse } from '@autronas/core/interfaces';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _URL = '/auth';
  private readonly _http = inject(HttpClient);

  public async login(googleData: GoogleLogin) {
    return await firstValueFrom(
      this._http.post<LoginResponse>(`${this._URL}/google`, googleData).pipe(
        map((res) => new ApiOkResponse(res.token)),
        catchError((err) => of(new ApiErrorResponse(err))),
        map((res) => new DataFromApi(res)),
      ),
    );
  }

  public async rehydrate() {
    return await firstValueFrom(
      this._http.get<LoginResponse>(`${this._URL}/rehydrate`).pipe(
        map((res) => new ApiOkResponse(res.token)),
        catchError((err) => of(new ApiErrorResponse(err))),
        map((res) => new DataFromApi(res)),
      ),
    );
  }
}
