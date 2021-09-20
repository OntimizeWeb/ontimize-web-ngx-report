import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OFileManagerModule } from 'ontimize-web-ngx-filemanager';
import { AlertService } from './components/report/alert.service';
import { FillService } from './components/report/fill.service';
import { ReportDetailComponent } from './components/report/report-detail/report-detail.component';
import { ReportNewComponent } from './components/report/report-new/report-new.component';
import { ReportRoutingModule } from './components/report/report-routing.module';
import { ReportViewerComponent } from './components/report/report-viewer/report-viewer.component';
import { ReportService } from './components/report/report.service';

import { OREPORT_MODULES, ReportHomeComponent } from './o-components';
// import { ReportHomeComponent } from './components/report/report-home/report-home.component';

export * from './o-components';

export function reportServiceFactory(injector: Injector): ReportService {
  return new ReportService(injector);
}

@NgModule({
  declarations: [
    ReportHomeComponent,
    ReportNewComponent,
    ReportDetailComponent,
    ReportViewerComponent,
    ReportHomeComponent],
  imports: [
    OREPORT_MODULES,
    CommonModule,
    OntimizeWebModule,
    ReportRoutingModule,
    OFileManagerModule,
    NgxExtendedPdfViewerModule,
    FlexLayoutModule
  ],
  exports: [
    OREPORT_MODULES,
    ReportHomeComponent,
    ReportNewComponent,
    ReportDetailComponent,
    ReportViewerComponent,
    ReportRoutingModule,
  ],
  providers: [{
    provide: 'report',
    useFactory: reportServiceFactory,
    deps: [Injector]
  }, AlertService, FillService],
  entryComponents: [ReportViewerComponent]
})
export class OReportModule { }
