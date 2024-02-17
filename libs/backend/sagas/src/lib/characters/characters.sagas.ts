import { Injectable, Logger } from '@nestjs/common';
import { IEvent, Saga, ofType } from '@nestjs/cqrs';
import { CharacterCreateForGameCommand, CharacterKillCommand } from '@sleep-valley/backend/commands';
import { GameStartedEvent, VoteConfirmedEvent } from '@sleep-valley/backend/events';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CharacterSagas {
  private readonly logger = new Logger(CharacterSagas.name);

  @Saga()
  killCharactersOnVoteFinished = (events$: Observable<IEvent>) => {
    return events$.pipe(
      ofType(VoteConfirmedEvent),
      map((event) => {
        this.logger.debug('killCharactersOnVoteFinished...');

        const { gameID } = event;

        return new CharacterKillCommand(gameID);
      }),
    );
  };

  @Saga()
  createCharactersOnGameStarted = (events$: Observable<IEvent>) => {
    return events$.pipe(
      ofType(GameStartedEvent),
      map((event) => {
        this.logger.debug('createCharactersOnGameStarted...');

        const { gameID } = event;

        return new CharacterCreateForGameCommand(gameID);
      }),
    );
  };
}
