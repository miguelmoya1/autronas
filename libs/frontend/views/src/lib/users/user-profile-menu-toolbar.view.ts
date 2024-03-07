import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthDtoService } from '@autronas/frontend/actions';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Component({
  selector: 'autronas-user-profile-menu-toolbar-view',
  standalone: true,
  imports: [NgOptimizedImage, MatMenuModule, MatIcon, TranslatePipe],
  template: `
    @if (isLogged()) {
      @if (currentUser().data; as user) {
        <div class="profile" [matMenuTriggerFor]="menu">
          <img
            ngSrc="{{ user.imageUrl }}"
            alt="{{ user.name }}"
            class="avatar"
            width="40"
            height="40"
          />
        </div>

        <mat-menu #menu="matMenu">
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span>{{ 'LOGOUT' | translate }}</span>
          </button>
        </mat-menu>
      }
    }
  `,
  styles: `
    .profile {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    img {
      border-radius: 9999px;

      cursor: pointer;
    }
  `,
})
export class UserProfileMenuToolbarView {
  private readonly _store = inject(StoreService);
  private readonly _authDtoService = inject(AuthDtoService);
  private readonly _router = inject(Router);

  protected readonly currentUser = this._store.get(STORE_KEYS.CURRENT_USER);
  protected readonly isLogged = this._store.get(STORE_KEYS.IS_LOGGED);

  protected async logout() {
    await this._authDtoService.logout();
    this._router.navigate(['/auth/login']);
  }
}
