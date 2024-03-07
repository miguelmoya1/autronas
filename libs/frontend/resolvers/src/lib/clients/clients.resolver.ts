import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ClientsService } from '@autronas/frontend/services';

export const clientsResolver: ResolveFn<boolean> = () => {
  inject(ClientsService);

  return true;
};
