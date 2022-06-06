export type OReportFunction = {
  columnName: string,
  functionName: 'SUM' | 'AVERAGE' | 'MIN' | 'MAX';
}