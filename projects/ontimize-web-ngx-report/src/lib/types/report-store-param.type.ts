import { OFilterParameter } from './filter-parameter.type';

export type OReportStoreParamValue = {
  name: string,
  value: any,
  sqlType ?:number
}

export type OReportStoreParam = {
  filters?: OFilterParameter,
  parameters?: Array<OReportStoreParamValue>
}
