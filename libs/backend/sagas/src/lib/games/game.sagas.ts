import { Injectable, Logger } from '@nestjs/common';
import { IEvent, Saga, ofType } from '@nestjs/cqrs';
import {
  GameGenerateCodeCommand,
  GameTryChangePhaseCommand,
  GameTryFinishCommand,
} from '@sleep-valley/backend/commands';
import {
  CharacterKilledEvent,
  CharacterRevivedEvent,
  CharacterSeenEvent,
  CharacterWitchSkippedEvent,
  GameCreatedEvent,
  GamePhaseChangedEvent,
} from '@sleep-valley/backend/events';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GameSagas {
  private readonly logger = new Logger(GameSagas.name);

  @Saga()
  createCodeOnGameCreated = (events$: Observable<IEvent>) => {
    return events$.pipe(
      ofType(GameCreatedEvent),
      map((event) => {
        this.logger.debug('onGameCreated...');

        const { gameID } = event;

        this.logger.verbose('gameID: ' + gameID);

        return new GameGenerateCodeCommand(gameID);
      }),
    );
  };

  @Saga()
  tryChangePhase = (events$: Observable<IEvent>) => {
    return events$.pipe(
      ofType(CharacterKilledEvent, CharacterRevivedEvent, CharacterWitchSkippedEvent, CharacterSeenEvent),
      map((event) => {
        this.logger.debug('onCharacterKilledNext...');

        const { gameID } = event;

        return new GameTryChangePhaseCommand(gameID);
      }),
    );
  };

  @Saga()
  TryFinishGameOnPhaseChanged = (events$: Observable<IEvent>) => {
    return events$.pipe(
      ofType(GamePhaseChangedEvent),
      map((event) => {
        this.logger.debug('onPhaseChangedNext...');

        const { gameID } = event;

        return new GameTryFinishCommand(gameID);
      }),
    );
  };
}
