import { AbstractControl, ValidationErrors } from '@angular/forms';
import { distinctUntilChanged, map, switchMap, timer } from 'rxjs';

export class Validators {
  static required = (error: string) => (control: AbstractControl) => {
    if (control.value === null || control.value === undefined || control.value === '') {
      return { required: error };
    }
    return null;
  };

  static email = (error: string) => (control: AbstractControl) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (control.value && !emailRegex.test(control.value)) {
      return { email: error };
    }
    return null;
  };

  static minLength = (minLength: number, error: string) => (control: AbstractControl) => {
    if (control.value && control.value.length < minLength) {
      return { minLength: error };
    }
    return null;
  };

  static minUppercase = (minUppercase: number, error: string) => (control: AbstractControl) => {
    if (control.value && (control.value.match(/[A-Z]/g)?.length || 0) < minUppercase) {
      return { minUppercase: error };
    }
    return null;
  };

  static minLowercase = (minLowercase: number, error: string) => (control: AbstractControl) => {
    if (control.value && (control.value.match(/[a-z]/g)?.length || 0) < minLowercase) {
      return { minLowercase: error };
    }
    return null;
  };

  static minNumber = (minNumber: number, error: string) => (control: AbstractControl) => {
    if (control.value && (control.value.match(/[0-9]/g)?.length || 0) < minNumber) {
      return { minNumber: error };
    }
    return null;
  };

  static maxLength =
    (maxLength: number, error: string) =>
    (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length > maxLength) {
        return { maxLength: error };
      }
      return null;
    };

  static min =
    (min: number, error: string) =>
    (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value < min) {
        return { min: error };
      }
      return null;
    };

  static max = (max: number, error: string) => (control: AbstractControl) => {
    if (control.value && control.value > max) {
      return { max: error };
    }
    return null;
  };

  static url = (error: string) => (control: AbstractControl) => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/g;
    if (control.value && !urlRegex.test(control.value)) {
      return { url: error };
    }
    return null;
  };

  static isUrlImage = (error: string) => (control: AbstractControl) => {
    return timer(500).pipe(
      distinctUntilChanged(),
      switchMap(async () => {
        if (!control.value) {
          return true;
        }

        try {
          const response = await fetch(control.value, { method: 'HEAD' });
          return response.headers.get('content-type')?.startsWith('image/');
        } catch (e) {
          const img = new Image();
          img.src = control.value;
          return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
          });
        }
      }),
      map((isImage) => (isImage ? null : { isUrlImage: error })),
    );
  };
}
