import { OReportColumn } from './report-column.type';
import { OReportOrderBy } from './report-orderBy.type';
import { OReportServiceRenderer } from './report-service-renderer.type';

export type OReportParam = {
  title: string,
  columns: Array<OReportColumn>,
  entity: string,
  groups: Array<string>,
  orderBy: Array<OReportOrderBy>,
  service: string,
  vertical: boolean,
  functions: Array<string>,
  style: Array<string>,
  subtitle: string,
  servicRenderer?: Array<OReportServiceRenderer>
}
