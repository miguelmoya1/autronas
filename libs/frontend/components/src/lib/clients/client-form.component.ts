import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Client } from '@autronas/core/interfaces';
import { getValidatorErrorMessage } from '@autronas/frontend/helpers';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { ClientFormService } from '@autronas/frontend/services';

@Component({
  selector: 'autronas-client-form',
  standalone: true,
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    TranslatePipe,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
  ],
})
export class ClientFormComponent {
  public readonly client = input<Client>();

  private readonly clientFormService = inject(ClientFormService);

  constructor() {
    effect(() => {
      const client = this.client();

      if (client) {
        this.form.patchValue(client);
      }
    });
  }

  protected get form() {
    return this.clientFormService.form;
  }

  protected getError(controlName: string) {
    const control = this.form.get(controlName);

    if (!control?.errors) {
      return '';
    }

    return control ? getValidatorErrorMessage(control.errors) : '';
  }

  protected shouldShowErrors = (controlName: string) => {
    const control = this.form.get(controlName);

    return control?.invalid && (control?.dirty || control?.touched) && control?.errors;
  };
}
