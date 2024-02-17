import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'sv-character-card-loading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="character-card animation-pulse">
      <mat-card-header>
        <mat-card-title>
          <div class="character-card-title animation-pulse"></div>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="character-card-content animation-pulse"></div>
      </mat-card-content>
      <mat-card-actions>
        <div class="character-card-actions animation-pulse"></div>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    .character-card {
      width: 300px;
      height: 150px;
    }

    .character-card-title {
      width: 100%;
      height: 2rem;
      border-radius: var(--sv-sys-border-radius-default);
      background-color: var(--sv-sys-color-background);
    }

    .character-card-content {
      width: 100%;
      height: 100%;
      border-radius: var(--sv-sys-border-radius-default);
      background-color: var(--sv-sys-color-background);
    }

    .character-card-actions {
      width: 100%;
      height: 2rem;
      border-radius: var(--sv-sys-border-radius-default);
      background-color: var(--sv-sys-color-background);
    }
  `,
  imports: [MatCardModule],
})
export class CharacterCardLoadingComponent {}
