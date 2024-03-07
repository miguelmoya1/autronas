import { Injectable, inject } from '@angular/core';
import { Events } from '@autronas/core/enums';
import { ShouldRefresh } from '@autronas/core/interfaces';
import { Socket } from 'ngx-socket-io';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSocketService {
  private readonly _userUpdated = new Subject<void>();
  private readonly _socket = inject(Socket);
  private declare _subscription?: Subscription;

  public readonly usersUpdated = this._userUpdated.asObservable();

  public async init() {
    this.subscribeToGameUpdates();
  }

  private subscribeToGameUpdates() {
    this.unsubscribeFromGameUpdates();

    this._subscription = this._socket
      .fromEvent<ShouldRefresh>(Events.USER)
      .subscribe((response) => {
        if (response.user) {
          this._userUpdated.next();
        }
      });
  }

  private unsubscribeFromGameUpdates() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
