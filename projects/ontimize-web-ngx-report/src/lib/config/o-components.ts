import { ApplyConfigurationDialogComponent } from "../components/report-on-demand/apply-configuration/apply-configuration-dialog.component";
import { ReportOnDemandComponent } from "../components/report-on-demand/report-on-demand/report-on-demand.component";
import { SavePreferencesDialogComponent } from "../components/report-on-demand/save-preferences-dialog/save-preferences-dialog.component";
import { SelectFunctionDialogComponent } from "../components/report-on-demand/select-function-dialog/select-function-dialog.component";
import { StyleDialogComponent } from "../components/report-on-demand/style-dialog/style-dialog.component";
import { OReportDetailComponent } from "../components/report/o-report-detail/o-report-detail.component";
import { OReportHomeComponent } from "../components/report/o-report-home/o-report-home.component";
import { OReportNewComponent } from "../components/report/o-report-new/o-report-new.component";
import { OReportSkeletonComponent } from "../components/report/o-report-skeleton/o-report-skeleton.component";
import { OReportViewerComponent } from "../components/report/o-report-viewer/o-report-viewer.component";

export const OREPORT_STANDALONE_COMPONENTS: any = [
  OReportHomeComponent,
  OReportNewComponent,
  OReportDetailComponent,
  OReportViewerComponent,
  OReportSkeletonComponent,
  ReportOnDemandComponent,
  StyleDialogComponent,
  SelectFunctionDialogComponent,
  SavePreferencesDialogComponent,
  ApplyConfigurationDialogComponent,
];

/** @deprecated Use OREPORT_STANDALONE_COMPONENTS — kept for backward compat */
export const OREPORT_DECLARATION_MODULES = OREPORT_STANDALONE_COMPONENTS;
export const OREPORT_IMPORTS_MODULES: any = [];
export const OREPORT_EXPORT_MODULES: any = [];
