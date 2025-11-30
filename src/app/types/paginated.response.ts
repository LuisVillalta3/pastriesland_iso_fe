export type PaginationMeta = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  prevPage: number | null;
  total: number;
  totalPages: number;
}

export type PaginatedResponse<T> = {
  results: T[];
  paginationProps: PaginationMeta
}
