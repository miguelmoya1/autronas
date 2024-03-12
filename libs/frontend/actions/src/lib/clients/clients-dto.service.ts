import { Injectable, inject } from '@angular/core';
import { ClientCreateInput } from '@autronas/core/interfaces';
import { ClientApiService } from '@autronas/frontend/services';

@Injectable({
  providedIn: 'root',
})
export class ClientsDtoService {
  private readonly _authApiService = inject(ClientApiService);

  public async create(client: ClientCreateInput) {
    const response = await this._authApiService.create(client);

    return response.isOk();
  }
}
