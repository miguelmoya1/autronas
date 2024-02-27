import { Component, OnInit, effect, inject, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthDtoService } from '@autronas/app/actions';
import { AuthService, UserService } from '@autronas/app/services';
import { STORE_KEYS, StoreService } from '@autronas/app/store';
import { SidenavView, ToolbarView } from '@autronas/app/views';

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
})
export class AppPage implements OnInit {
  private readonly _store = inject(StoreService);
  private readonly _authDtoService = inject(AuthDtoService);

  // LOAD THE SERVICES HERE
  private readonly _userService = inject(UserService);
  private readonly _authService = inject(AuthService);

  private firstLoad = true;

  constructor() {
    effect(() => {
      const tokenData = this._store.get(STORE_KEYS.TOKEN)();

      untracked(() => {
        if (!tokenData.loading && this.firstLoad && tokenData.data) {
          this._authDtoService.rehydrate();
          this.firstLoad = false;
        }
      });
    });
  }

  ngOnInit() {
    this.setTheme();
  }

  private setTheme() {
    // when the user change the theme, we update the body class (with prefer-color-scheme)
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (e) => {
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
