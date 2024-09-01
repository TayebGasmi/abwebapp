export interface PaginationRequest {
  page: number;
  pageSize: number;
  sortProperty: string;
  sortOrder: string;
  timeZone: string;
  // filters: { [key: string]: Filter[] };
  // globalFilter: GlobalFilter;
}

export interface Filter {
  matchMode: string;
  value: string;
  operator: string;
}

export interface GlobalFilter {
  keys: string[];
  value: string;
}
