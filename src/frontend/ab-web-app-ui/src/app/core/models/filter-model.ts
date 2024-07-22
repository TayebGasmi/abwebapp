import {MatchMode} from "../enum/match-mode.enum";
import {Operator} from "../enum/operator.enum";

export interface FilterModel {
  matchMode: MatchMode;
  value: string;
  operator: Operator;
}
