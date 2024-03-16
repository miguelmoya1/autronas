import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@autronas/frontend/pipes';

@Component({
  selector: 'autronas-clients-detail-view',
  standalone: true,
  template: `
    <h1>
      <div>
        <button mat-icon-button color="primary" [routerLink]="['/clients']">
          <mat-icon>chevron_left</mat-icon>
        </button>
        {{ 'CLIENT' | translate }}
      </div>

      <button mat-stroked-button color="warn">
        <mat-icon> edit </mat-icon>
        {{ 'EDIT' | translate }}
      </button>
    </h1>
  `,
  styles: `
    :host {
      display: block;
    }

    h1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
  imports: [MatIcon, MatButton, MatIconButton, TranslatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsDetailsView {}
