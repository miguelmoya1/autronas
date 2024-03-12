import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiErrorResponse, ApiOkResponse, DataFromApi } from '@autronas/frontend/shared';
import { catchError, firstValueFrom, map, of } from 'rxjs';

type Translate = { [key: string]: string };

@Injectable({
  providedIn: 'root',
})
export class TranslateApiService {
  private readonly _URL = '/translate';
  private readonly _LOCAL_URL = '/assets/i18n';
  private readonly _http = inject(HttpClient);

  public async getLanguages() {
    return await firstValueFrom(
      this._http.get<string[]>(`${this._URL}/languages`).pipe(
        map((languages) => new ApiOkResponse(languages)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public async get(language: string) {
    return await firstValueFrom(
      this._http.get<Translate>(`${this._URL}/${language}`).pipe(
        map((translate) => new ApiOkResponse(translate)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public async getLocale(language: string) {
    const response = await firstValueFrom(
      this._http
        .get<Translate>(`${this._LOCAL_URL}/${language}.json`, {
          headers: { 'skip-interceptor': 'true' },
        })
        .pipe(
          map((translate) => new ApiOkResponse(translate)),
          catchError((error) => of(new ApiErrorResponse(error))),
          map((response) => new DataFromApi(response)),
        ),
    );

    // if the local file is found, return it
    if (response.isOk()) {
      return response;
    }

    // if the local file is not found, return the default language
    return await firstValueFrom(
      this._http
        .get<Translate>(`${this._LOCAL_URL}/en.json`, {
          headers: { 'skip-interceptor': 'true' },
        })
        .pipe(
          map((translate) => new ApiOkResponse(translate)),
          catchError((error) => of(new ApiErrorResponse(error))),
          map((response) => new DataFromApi(response)),
        ),
    );
  }
}
