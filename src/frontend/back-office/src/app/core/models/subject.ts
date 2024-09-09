import {SchoolType} from "./school-type";
import {SchoolYear} from "./school-year";

export interface Subject {
  id: number;
  name: string;
  description: string;
  SchoolType: SchoolType;
  SchoolYear: SchoolYear;
}
