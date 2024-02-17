import { CharacterType, GamePhase, GameStatus } from '@sleep-valley/core/enums';
import { CharacterPermissions } from './character-permissions.model';

export interface Character {
  id: string;
  imageUrl: string;
  isAlive: boolean;
  isOwner: boolean;
  potionReviveUsed: boolean;
  potionKillUsed: boolean;
  seenBySeer: boolean;
  type: CharacterType;
  killedBy: CharacterType | null;
  permissions: CharacterPermissions;
  Owner: {
    id: string;
    name: string;
    surname: string;
    imageUrl: string;
  };
  Game: {
    id: string;
    status: GameStatus;
    phase: GamePhase;
  };
  gameID: string;
  ownerID: string;
  Votes: {
    id: string;
    Owner: {
      id: string;
      name: string;
      surname: string;
      imageUrl: string;
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
