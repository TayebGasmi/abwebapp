import {SchoolType} from "./SchoolType";
import {SchoolYear} from "./SchoolYear";

export interface Subject {
  id: number;
  name: string;
  description: string;
  SchoolType: SchoolType;
  SchoolYear: SchoolYear;
}
