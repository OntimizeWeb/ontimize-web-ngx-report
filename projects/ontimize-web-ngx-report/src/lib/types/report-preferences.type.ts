import { OReportColumn } from "./report-column.type"
import { OReportOrderBy } from "./report-orderBy.type"

export type OReportPreferences = {
  title: string
  subtitle: string,
  vertical: boolean,
  style: Array<string>,
  columns: Array<OReportColumn>,
  orderBy?: Array<OReportOrderBy>,
  functions?: Array<any>,
  groups?: Array<string>
}
