import { OReportFunction } from "../types";
import { OReportColumnStyle } from "../types/report-column-style.type";

export class Constants {
  public static DEFAULT_WIDTH_DIALOG = '70%';
  public static DEFAULT_HEIGHT_DIALOG = '90%';
  public static DEFAULT_COLUMN_STYLE: OReportColumnStyle = { width: 85, alignment: 'left' };
  public static DEFAULT_COLUMN_FUNCTION: OReportFunction = { columnName: 'TOTAL', functionName: 'TOTAL' };
}