import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@sleep-valley/app/pipes';
import { CardComponent } from '@sleep-valley/app/ui';
import { GameStatus } from '@sleep-valley/core/enums';
import { Game } from '@sleep-valley/core/interfaces';

@Component({
  selector: 'sv-game-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (game(); as game) {
      <sv-card>
        {{ game.name }} - {{ game.code }}

        <p class="game-status">
          @switch (game.status) {
            @case (GameStatus.PREPARING) {
              {{ 'GAME_STATUS_PREPARING' | translate }}
            }
            @case (GameStatus.STARTED) {
              {{ game.phase | translate }}
            }
            @case (GameStatus.FINISHED) {
              {{ 'GAME_STATUS_FINISHED' | translate }}
            }
            @default {
              {{ 'GAME_STATUS_UNKNOWN' | translate }}
            }
          }
        </p>
      </sv-card>
    }
  `,
  imports: [CardComponent, TranslatePipe],
  styles: `
    sv-card {
      cursor: pointer;
    }

    .game-status {
      font-size: 0.75rem;
      margin-top: 0.5rem;

      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;

    }
  `,
})
export class GameCardComponent {
  public game = input.required<Game>();

  protected readonly GameStatus = GameStatus;

  protected content = computed(() => {
    switch (this.game().status) {
      case GameStatus.PREPARING:
        return 'GAME_PREPARING';
      case GameStatus.STARTED:
        return this.game().phase;
      case GameStatus.FINISHED:
        return 'GAME_FINISHED';
    }
  });
}
