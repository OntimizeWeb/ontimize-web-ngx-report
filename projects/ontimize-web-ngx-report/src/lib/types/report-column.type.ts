import { OReportColumnStyle } from "./report-column-style.type"

export type OReportColumn = {
  id:string,
  name:string,
  columnStyle?: OReportColumnStyle
}