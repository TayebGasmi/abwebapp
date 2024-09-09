import {SchoolType} from "./school-type";
import {SchoolYear} from "./school-year";

export interface Subject {
  id: number;
  name: string;
  description: string;
  schoolTypes: SchoolType[];
  schoolYears: SchoolYear[];
}
