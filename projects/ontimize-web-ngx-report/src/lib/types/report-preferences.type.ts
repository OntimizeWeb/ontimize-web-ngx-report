import { OReportColumn } from "./report-column.type"
import { OReportOrderBy } from "./report-orderBy.type"
import { OReportStyleParams } from "./report-style-params.type"

export type OReportPreferences = {
  title: string
  subtitle: string,
  vertical: boolean,
  style: OReportStyleParams,
  columns: Array<OReportColumn>,
  orderBy?: Array<OReportOrderBy>,
  functions?: Array<any>,
  groups?: Array<string>
}
