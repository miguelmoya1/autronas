import { GoogleLoginEntity } from '@autronas/backend/entities';

export class LoginGoogleCommand {
  constructor(public readonly user: GoogleLoginEntity) {}
}
