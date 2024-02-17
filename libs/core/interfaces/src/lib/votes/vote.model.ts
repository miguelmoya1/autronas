import { VotePermissions } from './vote-permissions.model';

export interface Vote {
  id: string;
  permissions: VotePermissions;
  isConfirmed: boolean;
  isSkipped: boolean;
  gameID: string;
  characterID: string;
  createdAt: Date;
  updatedAt: Date;
  ownerID: string;
  Owner: {
    id: string;
    name: string;
    surname: string;
    imageUrl: string;
  };
}
