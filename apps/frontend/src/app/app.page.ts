import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthDtoService } from '@autronas/app/actions';
import { AuthService } from '@autronas/app/services';
import { STORE_KEYS, StoreService } from '@autronas/app/store';
import { SidenavView } from '@autronas/app/views';

@Component({
  selector: 'autronas-root',
  standalone: true,
  template: ` <autronas-sidenav-view /> `,
  styleUrl: './app.page.css',
  imports: [SidenavView],
})
export class AppPage implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _store = inject(StoreService);
  private readonly _authDtoService = inject(AuthDtoService);

  showFiller = false;

  open = signal(false);

  toggle() {
    this.open.set(!this.open());
  }

  async ngOnInit() {
    await this.loadServices();
    // when the user change the theme, we update the body class (with prefer-color-scheme)
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (e) => {
        this.toggleClass(e);
      });

    // set the initial theme
    this.toggleClass(window.matchMedia('(prefers-color-scheme: light)'));
  }

  private async loadServices() {
    await this._authService.init();

    // if the user is logged, then rehydrate
    if (this._store.get(STORE_KEYS.IS_LOGGED)()) {
      await this._authDtoService.rehydrate();
    }
  }

  private toggleClass(e: MediaQueryList | MediaQueryListEvent) {
    if (e.matches) {
      document.body.className = 'light-theme';
    } else {
      document.body.className = 'dark-theme';
    }
  }
}
