import { OReportColumn } from './report-column.type';
import { OReportFunction } from './report-function.type';
import { OReportOrderBy } from './report-orderBy.type';
import { OReportStyleParams } from './report-style-params.type';

export type OReportParam = {
  title: string,
  columns: Array<OReportColumn>,
  entity: string,
  groups: Array<string>,
  orderBy: Array<OReportOrderBy>,
  service: string,
  vertical: boolean,
  functions: Array<OReportFunction>,
  style: OReportStyleParams,
  subtitle: string,
  language: string,
  path:string
}
