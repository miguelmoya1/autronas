import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthDtoService } from '@autronas/app/actions';
import { TranslatePipe } from '@autronas/app/pipes';
import { STORE_KEYS, StoreService } from '@autronas/app/store';

@Component({
  selector: 'autronas-user-profile-menu-toolbar-view',
  standalone: true,
  imports: [NgOptimizedImage, MatMenuModule, MatIcon, TranslatePipe],
  templateUrl: './user-profile-menu-toolbar.view.html',
  styleUrl: './user-profile-menu-toolbar.view.css',
})
export class UserProfileMenuToolbarView {
  private readonly _store = inject(StoreService);
  private readonly _authDtoService = inject(AuthDtoService);
  private readonly _router = inject(Router);

  protected readonly isLogged = this._store.get(STORE_KEYS.IS_LOGGED);
  protected readonly currentUser = this._store.get(STORE_KEYS.CURRENT_USER);

  protected async logout() {
    await this._authDtoService.logout();
    this._router.navigate(['/auth/login']);
  }
}
