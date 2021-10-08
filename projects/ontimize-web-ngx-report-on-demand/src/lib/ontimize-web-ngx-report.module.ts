import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { OCustomMaterialModule } from 'ontimize-web-ngx';
import { CustomersDialogComponent } from './components/customers-dialog/customers-dialog.component';
import { SelectFunctionDialogComponent } from './components/select-function-dialog/select-function-dialog.component';
import { StyleDialogComponent } from './components/style-dialog/style-dialog.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OREPORT_MODULES, SavePreferencesDialogComponent, SettingsDialogComponent, SortColumnsDialogComponent } from './o-components';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

export * from './o-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OCustomMaterialModule,
    FlexLayoutModule,
    OntimizeWebModule,
    NgxExtendedPdfViewerModule],
  exports: OREPORT_MODULES,
  declarations: [
    CustomersDialogComponent,
    StyleDialogComponent,
    SelectFunctionDialogComponent,
    SettingsDialogComponent,
    SavePreferencesDialogComponent,
    SortColumnsDialogComponent
  ],
  entryComponents: [
    CustomersDialogComponent,
    StyleDialogComponent,
    SelectFunctionDialogComponent,
    SelectFunctionDialogComponent,
    SavePreferencesDialogComponent,
    SortColumnsDialogComponent

  ]
})
export class OReportModule { }
