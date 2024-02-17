import { Injectable, Logger } from '@nestjs/common';
import { IEvent, Saga, ofType } from '@nestjs/cqrs';
import { VoteClearCommand } from '@sleep-valley/backend/commands';
import { GamePhaseChangedEvent } from '@sleep-valley/backend/events';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class VoteSagas {
  private readonly logger = new Logger(VoteSagas.name);

  @Saga()
  clearVotesOnPhaseChanged = (events$: Observable<IEvent>) => {
    return events$.pipe(
      ofType(GamePhaseChangedEvent),
      map((event) => {
        this.logger.debug('clearVotesOnPhaseChanged...');

        const { gameID } = event;

        return new VoteClearCommand(gameID);
      }),
    );
  };
}
