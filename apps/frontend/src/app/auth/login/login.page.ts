import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { LoginView } from '@autronas/frontend/views';

@Component({
  selector: 'autronas-login-page',
  standalone: true,
  template: `
    <div class="container">
      <h1>{{ 'LOGIN_TO_PLAY' | translate }}</h1>

      <autronas-login-view />
    </div>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginView, TranslatePipe],
})
export class AuthLoginPage {}

export default AuthLoginPage;
