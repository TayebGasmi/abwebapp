export interface TableColumn {
  field: string;
  header: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'multi-select';
  sortable?: boolean;
  filterable?: boolean;
  options?: { label: string, value: any }[];

}
