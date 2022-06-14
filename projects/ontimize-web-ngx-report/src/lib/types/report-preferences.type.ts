import { OReportColumn } from "./report-column.type"
import { OReportOrderBy } from "./report-orderBy.type"
import { OReportStyleParams } from "./report-style-params.type"

export type OReportPreferences = {
  title: string
  subtitle: string,
  vertical: boolean,
  style: OReportStyleParams,
  columns: Array<OReportColumn>,
  orderBy?: Array<OReportOrderBy>,
  functions?: Array<any>,
  groups?: Array<string>
}

export class DefaultOReportPreferences implements OReportPreferences {
  public title: string;
  public subtitle: string;
  public vertical: boolean;
  public columns: OReportColumn[];
  public groups: string[];
  public functions: any[];
  public style: OReportStyleParams;
  public orderBy: OReportOrderBy[];

  constructor() {
    this.title = '';
    this.subtitle = '';
    this.vertical = true;
    this.columns = [];
    this.groups = [];
    this.functions = [];
    this.style = {
      grid: false, rowNumber: false, columnName: true, backgroundOnOddRows: false, hideGroupDetails: false, groupNewPage: false, firstGroupNewPage: false
    };
    this.orderBy = [];

  }
}

