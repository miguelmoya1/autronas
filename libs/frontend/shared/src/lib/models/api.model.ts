export interface Errors {
  statusCode: number;
  message: string;
}
export interface DataLoading {
  loading: true;
  data: null;
  error: null;
}

export interface DataLoaded<T> {
  loading: false;
  data: T;
  error: null;
}

export interface DataError {
  loading: false;
  data: null;
  error: Errors;
}

export type Data<T> = DataLoading | DataLoaded<T> | DataError;

export type DataFromApiSerialized<T> = DataLoaded<T> | DataError;
