import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthDtoService } from '@autronas/app/actions';
import { TranslatePipe } from '@autronas/app/pipes';
import { STORE_KEYS, StoreService } from '@autronas/app/store';

@Component({
  selector: 'autronas-login-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-button (click)="login()">
      {{ 'LOGIN_WITH_GOOGLE' | translate }}
    </button>
  `,
  imports: [TranslatePipe, MatButton],
})
export class LoginView {
  private readonly _store = inject(StoreService);
  private readonly _router = inject(Router);
  private readonly _authDtoService = inject(AuthDtoService);

  protected readonly token = this._store.get(STORE_KEYS.TOKEN);

  protected async login() {
    const loggedIn = await this._authDtoService.login();

    if (!loggedIn) {
      return;
    }

    await this._router.navigate(['/']);
  }
}
