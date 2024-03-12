import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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
  selector: 'autronas-clients-create-view',
  standalone: true,
  template: `
    <h1>
      <div>
        <button mat-icon-button color="primary" [routerLink]="['/clients']">
          <mat-icon>chevron_left</mat-icon>
        </button>
        {{ 'CREATE_CLIENT' | translate }}
      </div>

      <button mat-stroked-button color="warn" (click)="create()" [disabled]="!formValid">
        <mat-icon> add </mat-icon>
        {{ 'CREATE' | translate }}
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
export class ClientsCreateView implements OnInit {
  private readonly _clientFormService = inject(ClientFormService);
  private readonly _clientDTOService = inject(ClientsDtoService);
  private readonly _store = inject(StoreService);
  private readonly _router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);

  protected get formValid() {
    return this._clientFormService.form.valid;
  }

  public ngOnInit() {
    this._clientFormService.form.reset();
  }

  protected async create() {
    if (this.formValid) {
      const clientCreate = this._clientFormService.form.value as ClientCreateInput;

      const created = await this._clientDTOService.create(clientCreate);

      if (created) {
        this._snackBar.open(
          this._store.get(STORE_KEYS.TRANSLATE)().data?.['CLIENT_CREATED'] || 'CLIENT_CREATED',
          this._store.get(STORE_KEYS.TRANSLATE)().data?.['CLOSE'] || 'CLOSE',
          {
            duration: 3000,
          },
        );

        this._store.set(STORE_KEYS.CLIENTS_NEED_REFRESH, true);

        this._router.navigate(['/clients']);
      }
    }
  }
}
