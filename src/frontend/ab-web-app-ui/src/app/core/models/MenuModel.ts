import {MenuItem} from "./menu-item";

export interface MenuModel {
  label: string,
  items: MenuItem[],
  separator?: boolean,
  visible?: boolean,
}
