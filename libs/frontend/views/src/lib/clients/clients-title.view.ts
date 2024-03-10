import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@autronas/frontend/pipes';

@Component({
  selector: 'autronas-clients-title-view',
  standalone: true,
  template: `
    <div class="title-container">
      <h1>{{ 'CLIENTS' | translate }}</h1>

      <button mat-icon-button color="primary" [routerLink]="['/clients/new']">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .title-container {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 20px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, MatIconButton, MatIcon, RouterLink],
})
export class ClientsTitleView {}
