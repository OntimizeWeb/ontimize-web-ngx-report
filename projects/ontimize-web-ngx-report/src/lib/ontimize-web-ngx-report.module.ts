import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { O_REPORT_ON_DEMAND_SERVICE, OntimizeWebModule } from 'ontimize-web-ngx';

import { ApplyConfigurationDialogComponent } from './components/report-on-demand/apply-configuration/apply-configuration-dialog.component';
import { ReportOnDemandComponent } from './components/report-on-demand/report-on-demand/report-on-demand.component';
import { SavePreferencesDialogComponent } from './components/report-on-demand/save-preferences-dialog/save-preferences-dialog.component';
import { SelectFunctionDialogComponent } from './components/report-on-demand/select-function-dialog/select-function-dialog.component';
import { StyleDialogComponent } from './components/report-on-demand/style-dialog/style-dialog.component';
import { OAlertService } from './components/report/o-alert.service';
import { OFillReportService } from './components/report/o-fill-report.service';
import { OReportDetailComponent } from './components/report/o-report-detail/o-report-detail.component';
import { OReportNewComponent } from './components/report/o-report-new/o-report-new.component';
import { OReportRoutingModule } from './components/report/o-report-routing.module';
import { OReportViewerComponent } from './components/report/o-report-viewer/o-report-viewer.component';
import { OReportService } from './components/report/o-report.service';
import { OReportHomeComponent } from './o-components';
import { OReportOnDemandService } from './services/reports-on-demand.service';
import { OReportsTranslatePipe } from './util/o-reports-translate.pipe';

export * from './o-components';

export function reportServiceFactory(injector: Injector): OReportService {
  return new OReportService(injector);
}

@NgModule({
  declarations: [
    OReportHomeComponent,
    OReportNewComponent,
    OReportDetailComponent,
    OReportViewerComponent,
    OReportHomeComponent,
    ReportOnDemandComponent,
    StyleDialogComponent,
    SelectFunctionDialogComponent,
    SavePreferencesDialogComponent,
    ApplyConfigurationDialogComponent,
    OReportsTranslatePipe
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    OReportRoutingModule,
    NgxExtendedPdfViewerModule,
    FlexLayoutModule
  ],
  exports: [
    OReportHomeComponent,
    OReportNewComponent,
    OReportDetailComponent,
    OReportViewerComponent,
    OReportRoutingModule,
    ReportOnDemandComponent,
    StyleDialogComponent,
    SelectFunctionDialogComponent,
    SavePreferencesDialogComponent,
    ApplyConfigurationDialogComponent,
    OReportsTranslatePipe
  ],
  providers: [
    { provide: O_REPORT_ON_DEMAND_SERVICE, useClass: OReportOnDemandService },
    {
    provide: 'report',
    useFactory: reportServiceFactory,
    deps: [Injector]
  },
    OAlertService, OFillReportService
  ],
  entryComponents: [
    OReportViewerComponent,
    ReportOnDemandComponent,
    StyleDialogComponent,
    SelectFunctionDialogComponent,
    SavePreferencesDialogComponent,
    ApplyConfigurationDialogComponent
  ]
})

export class OReportModule { }
