export type ReportFunction = {
  columnName: string,
  functionName: 'SUM' | 'AVERAGE' | 'MIN' | 'MAX';
}