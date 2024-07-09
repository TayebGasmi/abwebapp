export interface MenuItem {
  label?: string;
  icon?: string;
  routerLink?: string | any[];
  queryParams?: { [k: string]: any };
  command?: (event?: any) => void;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
  url?: string;
  id?: string;
  badge?: string;
  badgeClass?: string;
  separator?: boolean;
  style?: any;
  styleClass?: string;
  title?: string;
  tooltip?: string;
  tooltipPosition?: string;
  tooltipEvent?: string;
}
