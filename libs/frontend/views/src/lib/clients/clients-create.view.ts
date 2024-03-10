import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ClientCreateInput } from '@autronas/core/interfaces';
import { ClientsDtoService } from '@autronas/frontend/actions';
import { ClientFormComponent } from '@autronas/frontend/components';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { ClientFormService } from '@autronas/frontend/services';

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

      <button
        mat-stroked-button
        color="warn"
        (click)="create()"
        [disabled]="!formValid"
      >
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
  imports: [
    TranslatePipe,
    ClientFormComponent,
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
    MatCard,
    MatCardContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsCreateView {
  private readonly clientFormService = inject(ClientFormService);
  private readonly clientDTOService = inject(ClientsDtoService);
  private readonly router = inject(Router);

  protected get formValid() {
    return this.clientFormService.form.valid;
  }

  protected async create() {
    if (this.formValid) {
      const clientCreate = this.clientFormService.form
        .value as ClientCreateInput;

      try {
        await this.clientDTOService.create(clientCreate);

        // TODO: Show snackbar or toast message with the success in the service
        // TODO: refresh the list of clients
        this.router.navigate(['/clients']);
      } catch (error) {
        // TODO: Handle error (show snackbar or toast message with the error in the service)
        console.error(error);
      }
    }
  }
}
