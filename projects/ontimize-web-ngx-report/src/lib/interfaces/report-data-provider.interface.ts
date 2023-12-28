import { OTableComponent } from "ontimize-web-ngx";
import { OReportPreferences } from "../types/report-preferences.type";
import { OReportParam } from "../types/report-param.type";

export interface IReportDataProvider {
  getReportConfiguration(currentPreference: OReportPreferences, table: OTableComponent): OReportParam;
}
