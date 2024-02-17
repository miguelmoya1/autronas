import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@sleep-valley/app/pipes';
import { ButtonComponent, CardComponent } from '@sleep-valley/app/ui';
import { Character } from '@sleep-valley/core/interfaces';

@Component({
  selector: 'sv-character-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (character(); as character) {
      <sv-card [type]="character.isAlive ? 'green' : 'red'" [selected]="selected()">
        <div class="container">
          <div class="header-container">
            <img class="image-rounded" [ngSrc]="'assets/imgs/' + character.type + '.webp'" width="64" height="64" />
            <span> {{ character.type | translate }} </span>
          </div>

          <span class="user-container"> {{ character.Owner.name }} {{ character.Owner.surname }} </span>

          <div class="actions-container">
            @if (character.Votes.length) {
              <div>{{ 'VOTES' | translate }}: {{ character.Votes.length }}</div>
            }
          </div>
        </div>
      </sv-card>
    }
  `,
  styleUrl: './character-card.component.css',
  imports: [CardComponent, NgOptimizedImage, TranslatePipe, ButtonComponent],
})
export class CharacterCardComponent {
  public readonly character = input.required<Character>();
  public readonly selected = input<boolean>();
}
