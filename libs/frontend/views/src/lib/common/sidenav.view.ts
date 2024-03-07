import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatTooltip } from '@angular/material/tooltip';
import { SidenavButtonComponent } from '@autronas/frontend/components';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Component({
  selector: 'autronas-sidenav-view',
  standalone: true,
  templateUrl: './sidenav.view.html',
  styleUrl: './sidenav.view.css',
  imports: [
    MatDrawer,
    TranslatePipe,
    NgClass,
    SidenavButtonComponent,
    MatDrawerContainer,
    MatDrawerContent,
    MatTooltip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavView {
  protected readonly open = signal(false);

  private readonly _store = inject(StoreService);

  protected toggle() {
    this.open.set(!this.open());
  }

  protected readonly isLogged = this._store.get(STORE_KEYS.IS_LOGGED);
}
