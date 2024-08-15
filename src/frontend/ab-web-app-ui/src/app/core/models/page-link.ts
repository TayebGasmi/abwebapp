import {SortOrder} from "../enum/sort-order.enum";
import {FilterModel} from "./filter-model";
import {GlobalFilter} from "./global-filter";

export interface PageLink {
  page: number;
  pageSize: number;
  sortProperty?: string;
  sortOrder?: SortOrder;
  timeZone?: string;
  filters?: { [key: string]: FilterModel[] };
  globalFilter?: GlobalFilter;
}
