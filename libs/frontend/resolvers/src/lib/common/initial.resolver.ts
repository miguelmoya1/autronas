import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService, TranslateService, UserService } from '@autronas/frontend/services';
import { StoreService } from '@autronas/frontend/store';

export const initialResolver: ResolveFn<boolean> = () => {
  inject(StoreService);
  inject(UserService);
  inject(AuthService);
  inject(TranslateService);

  return true;
};
