import { OReportColumnsStyle } from "./report-column-style.type"

export type OReportPreferences = {
  columns: Array<string>,
  functions: Array<any>,
  groups: Array<string>,
  title: string
  subtitle: string,
  styleFunctions: Array<string>,
  columnsStyle?: Array<OReportColumnsStyle>,
  vertical: boolean
}
