import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { ClientCreateInput } from '@autronas/core/interfaces';
import { ClientsDtoService } from '@autronas/frontend/actions';
import { ClientFormComponent } from '@autronas/frontend/components';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { ClientFormService } from '@autronas/frontend/services';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Component({
  selector: 'autronas-clients-edit-view',
  standalone: true,
  template: `
    <h1>
      <div>
        <button mat-icon-button color="primary" [routerLink]="['/clients', clientID()]">
          <mat-icon>chevron_left</mat-icon>
        </button>
        {{ 'EDIT_CLIENT' | translate }}
      </div>

      <button mat-stroked-button color="warn" (click)="update()" [disabled]="!formValid">
        <mat-icon> save </mat-icon>
        {{ 'SAVE' | translate }}
      </button>
    </h1>

    <autronas-client-form />
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    h1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
  imports: [TranslatePipe, ClientFormComponent, MatIcon, MatIconButton, MatButton, RouterLink, MatCard, MatCardContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsEditView implements OnInit {
  private readonly _clientFormService = inject(ClientFormService);
  private readonly _clientDTOService = inject(ClientsDtoService);
  private readonly _store = inject(StoreService);
  private readonly _router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);

  protected readonly clientID = this._store.get(STORE_KEYS.CLIENT_ID);

  constructor() {
    effect(() => {
      const client = this._store.get(STORE_KEYS.CLIENT)();

      if (client.loading) {
        this._clientFormService.form.disable();
      } else {
        this._clientFormService.form.enable();
      }

      if (client.data) {
        this._clientFormService.form.patchValue(client.data);
      }
    });
  }

  protected get formValid() {
    return this._clientFormService.form.valid;
  }

  public ngOnInit() {
    this._clientFormService.form.reset();
  }

  protected async update() {
    if (this.formValid) {
      const clientCreate = this._clientFormService.form.value as Required<ClientCreateInput>;

      const clientID = this.clientID();
      const currentClient = this._store.get(STORE_KEYS.CLIENT)().data;

      if (!clientID || !currentClient) {
        return;
      }

      const updated = await this._clientDTOService.update(clientCreate, clientID);

      if (updated) {
        this._snackBar.open(
          this._store.get(STORE_KEYS.TRANSLATE)().data?.['CLIENT_MODIFIED_SUCCESSFUL'] || 'CLIENT_MODIFIED_SUCCESSFUL',
          this._store.get(STORE_KEYS.TRANSLATE)().data?.['CLOSE'] || 'CLOSE',
          {
            duration: 3000,
          },
        );

        this._store.set(STORE_KEYS.CLIENT, {
          loading: false,
          data: {
            ...currentClient,
            ...clientCreate,
            id: clientID,
          },
          error: null,
        });

        this._router.navigate(['/clients', clientID]);
      }
    }
  }
}
