import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '@sleep-valley/app/ui';
import { User } from '@sleep-valley/core/interfaces';

@Component({
  selector: 'sv-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (user(); as user) {
      <sv-card>
        <div class="container">
          @if (user.imageUrl) {
            <img class="image-rounded" [ngSrc]="user.imageUrl" width="64" height="64" />
          }
          <span> {{ user.name }} {{ user.surname }} </span>
        </div>
      </sv-card>
    }
  `,
  styleUrl: './user-card.component.css',
  imports: [CardComponent, NgOptimizedImage],
})
export class UserCardComponent {
  public readonly user = input.required<User>();
}
