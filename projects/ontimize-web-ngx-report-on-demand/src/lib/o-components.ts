import { ReportOnDemandComponent } from './components/report-on-demand/report-on-demand.component';
import { SavePreferencesDialogComponent } from './components/save-preferences-dialog/save-preferences-dialog.component';
import { SelectFunctionDialogComponent } from './components/select-function-dialog/select-function-dialog.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { StyleDialogComponent } from './components/style-dialog/style-dialog.component';

export * from './components/report-on-demand/report-on-demand.component';
export * from './components/select-function-dialog/select-function-dialog.component'
export * from './components/style-dialog/style-dialog.component'
export * from './components/settings-dialog/settings-dialog.component'
export * from './components/save-preferences-dialog/save-preferences-dialog.component'

export const OREPORT_MODULES: any = [
  ReportOnDemandComponent,
  StyleDialogComponent,
  SelectFunctionDialogComponent,
  SettingsDialogComponent,
  SavePreferencesDialogComponent
];
