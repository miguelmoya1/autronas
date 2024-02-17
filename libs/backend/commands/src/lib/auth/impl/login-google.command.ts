import { GoogleLoginEntity } from '@sleep-valley/backend/entities';

export class LoginGoogleCommand {
  constructor(public readonly user: GoogleLoginEntity) {}
}
