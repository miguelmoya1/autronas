import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { UserProfileMenuToolbarView } from '../users/user-profile-menu-toolbar.view';

@Component({
  selector: 'autronas-toolbar-view',
  standalone: true,
  templateUrl: './toolbar.view.html',
  styleUrl: './toolbar.view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbar, UserProfileMenuToolbarView],
})
export class ToolbarView {
  private readonly _store = inject(StoreService);

  protected readonly isLogged = this._store.get(STORE_KEYS.IS_LOGGED);
}
