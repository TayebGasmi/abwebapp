import {TemplateRef} from "@angular/core";

export interface TableColumnHeader {
  displayName?: string,
  dataKey: string
  template?: TemplateRef<any> | null
  object?:boolean,
  objectKey?:string
}
