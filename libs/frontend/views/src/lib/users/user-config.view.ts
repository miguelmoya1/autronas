import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Component({
  selector: 'autronas-user-config-view',
  standalone: true,
  imports: [TranslatePipe, MatCard, MatCardContent, MatButton, MatCardHeader, MatCardTitle],
  template: `
    <h1>{{ 'SETTINGS' | translate }}</h1>

    <div class="cards-container">
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>{{ 'LANGUAGES' | translate }}</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="switcher">
            <button mat-stroked-button (click)="changeLanguage('en')">
              <span> {{ 'ENGLISH' | translate }} </span>
            </button>
            <button mat-stroked-button (click)="changeLanguage('es')">
              <span> {{ 'SPANISH' | translate }} </span>
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>{{ 'THEME' | translate }}</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="switcher">
            <button mat-stroked-button (click)="changeTheme('light-theme')">
              <span> {{ 'LIGHT' | translate }} </span>
            </button>
            <button mat-stroked-button (click)="changeTheme('dark-theme')">
              <span> {{ 'DARK' | translate }} </span>
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .cards-container {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .switcher {
      display: flex;
      align-items: center;

      gap: 1rem;
    }
  `,
})
export class UserConfigView {
  protected readonly _store = inject(StoreService);

  protected changeLanguage(lang: string) {
    this._store.set(STORE_KEYS.CURRENT_LANGUAGE, lang);
  }

  protected changeTheme(theme: 'light-theme' | 'dark-theme') {
    this._store.set(STORE_KEYS.CURRENT_THEME, theme);
  }
}
