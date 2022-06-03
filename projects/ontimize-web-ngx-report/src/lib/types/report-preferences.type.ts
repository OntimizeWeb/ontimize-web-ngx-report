import { OReportColumnsStyle } from "./report-column-style.type"
import { OReportOrderBy } from "./report-orderBy.type"

export type OReportPreferences = {
  columns: Array<string>,
  functions: Array<any>,
  groups: Array<string>,
  title: string
  subtitle: string,
  styleFunctions: Array<string>,
  columnsStyle?: Array<OReportColumnsStyle>,
  columnsOrderBy?: Array<OReportOrderBy>,
  vertical: boolean
}
