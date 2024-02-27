import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { SidenavButtonComponent } from '@autronas/app/components';
import { TranslatePipe } from '@autronas/app/pipes';
import { STORE_KEYS, StoreService } from '@autronas/app/store';

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
  ],
})
export class SidenavView {
  protected readonly open = signal(false);

  private readonly _store = inject(StoreService);

  protected toggle() {
    this.open.set(!this.open());
  }

  protected readonly isLogged = this._store.get(STORE_KEYS.IS_LOGGED);
}
