import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { TranslatePipe } from '@sleep-valley/app/pipes';
import { ButtonComponent, CardComponent } from '@sleep-valley/app/ui';
import { User } from '@sleep-valley/core/interfaces';

@Component({
  selector: 'sv-game-card-request',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (user(); as user) {
      <sv-card>
        <div class="title-container">
          @if (user.imageUrl) {
            <img class="image-rounded" [ngSrc]="user.imageUrl" width="64" height="64" />
          }
          <span> {{ user.name }} {{ user.surname }} </span>
        </div>

        <div class="actions-container">
          <sv-button (click)="decline()">
            {{ 'DECLINE' | translate }}
          </sv-button>
          <sv-button (click)="accept()"> {{ 'ACCEPT' | translate }} </sv-button>
        </div>
      </sv-card>
    }
  `,
  styleUrl: './game-card-request.component.css',
  imports: [CardComponent, TranslatePipe, NgOptimizedImage, ButtonComponent],
})
export class GameCardRequestComponent {
  public user = input.required<User>();

  @Output() public readonly accepted = new EventEmitter<void>();
  @Output() public readonly declined = new EventEmitter<void>();

  public async accept() {
    this.accepted.emit();
  }

  public async decline() {
    this.declined.emit();
  }
}
