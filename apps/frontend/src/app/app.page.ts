import { ChangeDetectionStrategy, Component, effect, inject, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthDtoService } from '@autronas/frontend/actions';
import { AuthService, ThemeService, TranslateService, UserService } from '@autronas/frontend/services';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { SidenavView, ToolbarView } from '@autronas/frontend/views';

@Component({
  selector: 'autronas-root',
  standalone: true,
  template: `
    <autronas-sidenav-view>
      <autronas-toolbar-view />

      <main>
        <router-outlet />
      </main>
    </autronas-sidenav-view>
  `,
  styleUrl: './app.page.css',
  imports: [SidenavView, RouterOutlet, ToolbarView],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPage {
  private readonly _store = inject(StoreService);
  private readonly _authDtoService = inject(AuthDtoService);

  private firstLoad = true;

  constructor() {
    this.initBaseServices();

    effect(() => {
      const tokenData = this._store.get(STORE_KEYS.TOKEN)();
      const isLoggedLoading = this._store.get(STORE_KEYS.IS_LOGGED_LOADING)();

      if (tokenData && this.firstLoad && !isLoggedLoading) {
        untracked(() => {
          try {
            this._authDtoService.rehydrate();
          } catch (e) {
            this._authDtoService.logout();
            console.error(e);
          }
        });

        this.firstLoad = false;
      }
    });
  }

  /**
   * Initialize ONLY the base services like auth, currentUser and the translates.
   */
  private initBaseServices() {
    inject(AuthService);

    inject(UserService);
    inject(TranslateService);

    inject(ThemeService);
  }
}
