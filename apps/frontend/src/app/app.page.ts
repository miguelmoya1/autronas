import { ChangeDetectionStrategy, Component, OnInit, effect, inject, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthDtoService } from '@autronas/frontend/actions';
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
export class AppPage implements OnInit {
  private readonly _store = inject(StoreService);
  private readonly _authDtoService = inject(AuthDtoService);

  private firstLoad = true;

  constructor() {
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

  ngOnInit() {
    this.setTheme();
  }

  private setTheme() {
    // when the user change the theme, we update the body class (with prefer-color-scheme)
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      this.toggleClass(e);
    });

    // set the initial theme
    this.toggleClass(window.matchMedia('(prefers-color-scheme: light)'));
  }

  private toggleClass(e: MediaQueryList | MediaQueryListEvent) {
    if (e.matches) {
      document.body.className = 'light-theme';
    } else {
      document.body.className = 'dark-theme';
    }
  }
}
