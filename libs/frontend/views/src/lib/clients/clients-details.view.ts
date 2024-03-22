import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Component({
  selector: 'autronas-clients-detail-view',
  standalone: true,
  template: `
    @if (client().loading) {
      <mat-progress-bar mode="indeterminate" />
    }

    <h1>
      <div>
        <button mat-icon-button color="primary" [routerLink]="['/clients']">
          <mat-icon>chevron_left</mat-icon>
        </button>
        {{ 'CLIENT' | translate }}
      </div>

      <button
        mat-stroked-button
        color="warn"
        [disabled]="client().loading"
        [routerLink]="['/clients', client().data?.id, 'edit']"
      >
        <mat-icon> edit </mat-icon>
        {{ 'EDIT' | translate }}
      </button>
    </h1>

    @if (client().data; as client) {
      <mat-card appearance="outlined">
        <mat-card-content class="content">
          <div>
            <mat-icon>person</mat-icon>
            {{ client.name }} {{ client.surname }}
          </div>

          <div>
            <mat-icon>email</mat-icon>
            <a [href]="'mailto:' + client.email" target="_blank">
              {{ client.email }}
            </a>
          </div>

          <div>
            <mat-icon>credit_card</mat-icon>
            {{ client.personalID }}
          </div>

          <div>
            <mat-icon>phone</mat-icon>
            @if (client.phoneNumber) {
              <a [href]="'tel:' + client.phoneNumber">
                {{ client.phoneNumber }}
              </a>
            } @else {
              '-'
            }
          </div>

          <div>
            <mat-icon [matTooltip]="'IS_BUSINESS' | translate">business</mat-icon>
            @if (client.isBusiness) {
              {{ 'YES' | translate }}
            } @else {
              {{ 'NO' | translate }}
            }
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined">
        <mat-card-content class="content">
          <div>
            <mat-icon>notes</mat-icon>
            <pre>{{ client.notes || '-' }}</pre>
          </div>
        </mat-card-content>
      </mat-card>
    }
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

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      width: 100%;

      max-height: 200px;
      overflow: auto;
    }
  `,
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    TranslatePipe,
    RouterLink,
    MatProgressBar,
    MatCard,
    MatCardContent,
    MatTooltip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsDetailsView {
  private readonly _store = inject(StoreService);

  protected readonly client = this._store.get(STORE_KEYS.CLIENT);
}
