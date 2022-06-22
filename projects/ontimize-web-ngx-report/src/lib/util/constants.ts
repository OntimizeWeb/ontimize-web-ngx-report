import { OReportFunction } from "../types";
import { OReportColumnStyle } from "../types/report-column-style.type";

export class Constants {
  public static DEFAULT_WIDTH_DIALOG = '70%';
  public static DEFAULT_HEIGHT_DIALOG = '90%';
  public static DEFAULT_WIDTH_COLUMN_STYLE = 85;
  public static DEFAULT_ALIGNMENT_COLUMN_STYLE: 'center' | 'right' | 'left' = 'left';
  public static DEFAULT_COLUMN_FUNCTION: OReportFunction = { columnName: 'TOTAL', type: 'TOTAL' };
}
