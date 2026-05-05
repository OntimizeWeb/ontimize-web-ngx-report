import { IReportRenderer } from "../interfaces/report-renderer.interface"

export type OReportColumnStyle = {
  width?: number,
  alignment?: 'center' | 'right' | 'left',
  renderer?: IReportRenderer
}