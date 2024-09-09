import {ConfigType} from "../enum/config-type.enum";


export interface Config {
  id: number,
  key: string,
  value: string,
  description: string,
  valueType: ConfigType
}
