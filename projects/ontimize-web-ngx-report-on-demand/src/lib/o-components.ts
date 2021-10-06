import { CustomersDialogComponent } from './components/customers-dialog/customers-dialog.component';
import { SelectFunctionDialogComponent } from './components/select-function-dialog/select-function-dialog.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { StyleDialogComponent } from './components/style-dialog/style-dialog.component';

export * from './components/customers-dialog/customers-dialog.component';
export * from './components/select-function-dialog/select-function-dialog.component'
export * from './components/style-dialog/style-dialog.component'
export * from './components/settings-dialog/settings-dialog.component'

export const OREPORT_MODULES: any = [
  CustomersDialogComponent,
  StyleDialogComponent,
  SelectFunctionDialogComponent,
  SettingsDialogComponent
];
