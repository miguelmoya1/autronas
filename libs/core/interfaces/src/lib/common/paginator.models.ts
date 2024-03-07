export type Paginated<T> = {
  data: T[];

  count: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type Paginator = {
  offset: number;
  limit: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
};
