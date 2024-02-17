import { Injectable, inject } from '@angular/core';
import { Events } from '@sleep-valley/core/enums';
import { ShouldRefresh } from '@sleep-valley/core/interfaces';
import { Socket } from 'ngx-socket-io';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoteSocketService {
  private readonly _voteUpdated = new Subject<void>();
  private readonly _socket = inject(Socket);
  private declare _subscription?: Subscription;

  public readonly voteSUpdated = this._voteUpdated.asObservable();

  public async init() {
    this.subscribeToGameUpdates();
  }

  private subscribeToGameUpdates() {
    this.unsubscribeFromGameUpdates();

    this._subscription = this._socket.fromEvent<ShouldRefresh>(Events.GAME).subscribe((response) => {
      if (response.vote) {
        this._voteUpdated.next();
      }
    });
  }

  private unsubscribeFromGameUpdates() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
