import { Injectable, inject } from '@angular/core';
import { VoteCreate } from '@sleep-valley/core/interfaces';
import { VoteApiService } from './vote-api.service';

@Injectable({
  providedIn: 'root',
})
export class VoteDtoService {
  private readonly _voteApiService = inject(VoteApiService);

  public async create(voteCreate: VoteCreate) {
    const result = await this._voteApiService.create(voteCreate);

    return result.serialize();
  }

  public async confirm(gameID: string) {
    const result = await this._voteApiService.confirm(gameID);

    return result.isOk();
  }
}
