import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OFileManagerModule } from 'ontimize-web-ngx-filemanager';
import { OAlertService } from './components/report/o-alert.service';
import { OFillReportService } from './components/report/o-fill-report.service';
import { OReportDetailComponent } from './components/report/o-report-detail/o-report-detail.component';
import { OReportNewComponent } from './components/report/o-report-new/o-report-new.component';
import { OReportRoutingModule } from './components/report/o-report-routing.module';
import { OReportViewerComponent } from './components/report/o-report-viewer/o-report-viewer.component';
import { OReportService } from './components/report/o-report.service';

import { OREPORT_MODULES, OReportHomeComponent } from './o-components';

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
    OReportHomeComponent],
  imports: [
    OREPORT_MODULES,
    CommonModule,
    OntimizeWebModule,
    OReportRoutingModule,
    OFileManagerModule,
    NgxExtendedPdfViewerModule,
    FlexLayoutModule
  ],
  exports: [
    OREPORT_MODULES,
    OReportHomeComponent,
    OReportNewComponent,
    OReportDetailComponent,
    OReportViewerComponent,
    OReportRoutingModule,
  ],
  providers: [{
    provide: 'report',
    useFactory: reportServiceFactory,
    deps: [Injector]
  }, OAlertService, OFillReportService],
  entryComponents: [OReportViewerComponent]
})
export class OReportModule { }
