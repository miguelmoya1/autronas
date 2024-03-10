import { Injectable, inject } from '@angular/core';
import { ClientCreateInput } from '@autronas/core/interfaces';
import { ClientApiService } from '@autronas/frontend/services';

@Injectable({
  providedIn: 'root',
})
export class ClientsDtoService {
  private readonly _authApiService = inject(ClientApiService);

  public create(client: ClientCreateInput) {
    return this._authApiService.create(client);
  }
}
