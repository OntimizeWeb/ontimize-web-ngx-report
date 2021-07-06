import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ReportNewComponent } from './report-new/report-new.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportFillComponent } from './report-fill/report-fill.component';
import { ReportRoutingModule } from './report-routing.module';
import { OFileManagerModule } from 'ontimize-web-ngx-filemanager';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AlertService } from './alert.service';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { OReportButtonComponent } from './o-report-button/o-report-button.component';

export function reportServiceFactory(injector: Injector): ReportService {
  return new ReportService(injector);
}

@NgModule({
  declarations: [ReportComponent, ReportNewComponent, ReportDetailComponent, ReportFillComponent, ReportViewerComponent, OReportButtonComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ReportRoutingModule,
    OFileManagerModule,
    NgxExtendedPdfViewerModule
  ],
  exports: [
    ReportComponent,
    ReportNewComponent,
    ReportDetailComponent,
    ReportFillComponent,
    ReportViewerComponent,
    ReportRoutingModule,
    OReportButtonComponent
  ],
  providers: [{
    provide: 'report',
    useFactory: reportServiceFactory,
    deps: [Injector]
  }, AlertService],
  entryComponents: [ReportViewerComponent]
})
export class ReportModule { }
