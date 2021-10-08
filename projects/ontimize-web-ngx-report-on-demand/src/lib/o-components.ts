import { CustomersDialogComponent } from './components/customers-dialog/customers-dialog.component';
import { SavePreferencesDialogComponent } from './components/save-preferences-dialog/save-preferences-dialog.component';
import { SelectFunctionDialogComponent } from './components/select-function-dialog/select-function-dialog.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { SortColumnsDialogComponent } from './components/sort-columns-dialog/sort-columns-dialog.component';
import { StyleDialogComponent } from './components/style-dialog/style-dialog.component';

export * from './components/customers-dialog/customers-dialog.component';
export * from './components/select-function-dialog/select-function-dialog.component'
export * from './components/style-dialog/style-dialog.component'
export * from './components/settings-dialog/settings-dialog.component'
export * from './components/save-preferences-dialog/save-preferences-dialog.component'
export * from './components/sort-columns-dialog/sort-columns-dialog.component'

export const OREPORT_MODULES: any = [
  CustomersDialogComponent,
  StyleDialogComponent,
  SelectFunctionDialogComponent,
  SettingsDialogComponent,
  SavePreferencesDialogComponent,
  SortColumnsDialogComponent
];
