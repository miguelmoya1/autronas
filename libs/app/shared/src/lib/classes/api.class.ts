import { HttpErrorResponse } from '@angular/common/http';
import { Data, DataFromApiSerialized, Errors } from '../models/api.model';

export class ApiOkResponse<T> {
  public readonly data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class ApiErrorResponse {
  public readonly error: Errors;

  constructor(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      const errorToSave = error.error;

      this.error = errorToSave;
    } else {
      this.error = {
        statusCode: 0,
        message: 'Unknown error',
      };
    }
  }
}

export class DataFromApi<T> {
  private readonly _error?: Errors;
  private readonly _data?: T;

  constructor(data: ApiOkResponse<T> | ApiErrorResponse) {
    if (data instanceof ApiErrorResponse) {
      this._error = data.error;
      return;
    }

    this._data = data.data;
  }

  public serialize(): DataFromApiSerialized<T> {
    if (this._data !== undefined) {
      return {
        loading: false,
        data: this._data,
        error: null,
      };
    }

    if (this._error !== undefined) {
      return {
        loading: false,
        data: null,
        error: this._error,
      };
    }

    return {
      loading: false,
      data: null,
      error: {
        statusCode: 500,
        message: 'Unknown error',
      },
    };
  }

  public isOk() {
    return this._data !== undefined;
  }
}

export const defaultDataLoading = <T>(): Data<T> => ({
  loading: true,
  data: null,
  error: null,
});
