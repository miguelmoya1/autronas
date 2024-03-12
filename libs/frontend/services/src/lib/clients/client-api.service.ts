import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Client, ClientCreateInput, ClientUpdateInput, Paginated, Paginator } from '@autronas/core/interfaces';
import { ApiErrorResponse, ApiOkResponse, DataFromApi } from '@autronas/frontend/shared';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientApiService {
  private readonly _URL = '/clients';
  private readonly _http = inject(HttpClient);

  public getAll(paginator: Required<Paginator>) {
    return firstValueFrom(
      this._http.get<Paginated<Client>>(this._URL, { params: paginator }).pipe(
        map((clients) => new ApiOkResponse(clients)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public create(client: ClientCreateInput) {
    return firstValueFrom(
      this._http.post<Client>(this._URL, client).pipe(
        map((client) => new ApiOkResponse(client)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }

  public update(client: ClientUpdateInput, id: string) {
    return firstValueFrom(
      this._http.put<Client>(`${this._URL}/${id}`, client).pipe(
        map((client) => new ApiOkResponse(client)),
        catchError((error) => of(new ApiErrorResponse(error))),
        map((response) => new DataFromApi(response)),
      ),
    );
  }
}
