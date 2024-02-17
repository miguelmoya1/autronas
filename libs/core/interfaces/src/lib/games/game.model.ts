import { CharacterType, GamePhase, GameStatus } from '@sleep-valley/core/enums';
import { GamePermissions } from './game-permissions.model';

export interface Game {
  readonly permissions: GamePermissions;
  readonly id: string;
  readonly name: string;
  readonly withWitch: boolean;
  readonly withSeer: boolean;
  readonly code: string;
  readonly imageUrl: string;
  readonly hasCharacters: boolean;
  readonly isOwner: boolean;
  readonly hasEnoughUsers: boolean;
  readonly winners: CharacterType | null;
  readonly status: GameStatus;
  readonly phase: GamePhase;
}
