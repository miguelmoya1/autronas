import { ValidationErrors } from '@angular/forms';

export const getValidatorErrorMessage = (errors: ValidationErrors) => {
  const firstKey = Object.keys(errors)[0];

  const config: {
    [key: keyof ValidationErrors]: string;
  } = {
    required: 'THIS_FIELD_IS_REQUIRED',
    email: 'INVALID_EMAIL',
    minlength: ` MIN_LENGTH_IS_${errors?.['requiredLength']}`,
    // Add more error messages here
  };

  return config[firstKey];
};
