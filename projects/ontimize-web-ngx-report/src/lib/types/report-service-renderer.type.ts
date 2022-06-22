export type OReportServiceRenderer = {
  service: string,
  entity: string,
  keyColumn: string,
  valueColumn: string,
  columns: Array<string>,
  parentKeys: Array<string>,
  path: string
}