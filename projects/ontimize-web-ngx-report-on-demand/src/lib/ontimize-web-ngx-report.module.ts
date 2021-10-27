import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { OCustomMaterialModule, O_REPORT_ON_DEMAND_SERVICE } from 'ontimize-web-ngx';
import { ReportOnDemandComponent } from './components/report-on-demand/report-on-demand.component';
import { SelectFunctionDialogComponent } from './components/select-function-dialog/select-function-dialog.component';
import { StyleDialogComponent } from './components/style-dialog/style-dialog.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ApplyConfigurationDialogComponent, OREPORT_MODULES, SavePreferencesDialogComponent } from './o-components';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OReportOnDemandService } from './services/reports-on-demand.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OReportsTranslatePipe } from './util/o-reports-translate.pipe';

export * from './o-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OCustomMaterialModule,
    FlexLayoutModule,
    OntimizeWebModule,
    NgxExtendedPdfViewerModule,
    DragDropModule],
  exports: OREPORT_MODULES,
  declarations: [
    ReportOnDemandComponent,
    StyleDialogComponent,
    SelectFunctionDialogComponent,
    SavePreferencesDialogComponent,
    ApplyConfigurationDialogComponent,
    OReportsTranslatePipe
  ],
  entryComponents: [
    ReportOnDemandComponent,
    StyleDialogComponent,
    SelectFunctionDialogComponent,
    SelectFunctionDialogComponent,
    SavePreferencesDialogComponent,
    ApplyConfigurationDialogComponent

  ],
  providers: [
    { provide: O_REPORT_ON_DEMAND_SERVICE, useClass: OReportOnDemandService }
  ]
})
export class OReportModule { }
