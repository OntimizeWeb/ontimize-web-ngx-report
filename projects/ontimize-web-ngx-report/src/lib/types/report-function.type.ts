export type OReportFunction = {
  columnName: string,
  type: 'SUM' | 'AVERAGE' | 'MIN' | 'MAX' | 'TOTAL';
}