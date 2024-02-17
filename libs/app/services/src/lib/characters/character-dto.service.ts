import { Injectable, inject } from '@angular/core';
import {
  CharacterKillByWitch,
  CharacterRevive,
  CharacterSeer,
  CharacterWitchSkip,
} from '@sleep-valley/core/interfaces';
import { CharacterApiService } from './character-api.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterDtoService {
  private readonly _charactersApiService = inject(CharacterApiService);

  public async reviveByWitch(characterRevive: CharacterRevive) {
    const response = await this._charactersApiService.reviveByWitch(characterRevive);

    return response.isOk();
  }

  public async killByWitch(characterKillByWitch: CharacterKillByWitch) {
    const response = await this._charactersApiService.killByWitch(characterKillByWitch);

    return response.isOk();
  }

  public async skipWitch(characterWitchSkip: CharacterWitchSkip) {
    const response = await this._charactersApiService.skipByWitch(characterWitchSkip);

    return response.isOk();
  }

  public async seeBySeer(characterSeer: CharacterSeer) {
    const response = await this._charactersApiService.seeBySeer(characterSeer);

    return response.isOk();
  }
}
