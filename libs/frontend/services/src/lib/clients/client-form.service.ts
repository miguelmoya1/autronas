import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ClientFormService {
  public readonly form = new FormGroup({
    name: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    surname: new FormControl<string | undefined>(undefined),
    email: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    personalID: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl<string | undefined>(undefined),
    isBusiness: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    notes: new FormControl<string | undefined>(undefined),
  });

  constructor() {
    this.addObservers();
  }

  private addObservers() {
    // ...
  }
}
