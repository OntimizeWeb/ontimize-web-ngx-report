import { BasicExpression } from "ontimize-web-ngx"

export type OFilterParameter = {
  filter: object | BasicExpression,
  columns?: Array<string>,
  sqltypes?: object,
  offset?: number,
  pageSize?: number
}