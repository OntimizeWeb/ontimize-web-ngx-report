import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { OReportHomeComponent } from '../components/report/o-report-home/o-report-home.component';
import { OReportNewComponent } from '../components/report/o-report-new/o-report-new.component';
import { OReportDetailComponent } from '../components/report/o-report-detail/o-report-detail.component';
import { OReportViewerComponent } from '../components/report/o-report-viewer/o-report-viewer.component';
import { ReportOnDemandComponent } from '../components/report-on-demand/report-on-demand/report-on-demand.component';
import { StyleDialogComponent } from '../components/report-on-demand/style-dialog/style-dialog.component';
import { SelectFunctionDialogComponent } from '../components/report-on-demand/select-function-dialog/select-function-dialog.component';
import { SavePreferencesDialogComponent } from '../components/report-on-demand/save-preferences-dialog/save-preferences-dialog.component';
import { ApplyConfigurationDialogComponent } from '../components/report-on-demand/apply-configuration/apply-configuration-dialog.component';
import { OReportsTranslatePipe } from '../util/o-reports-translate.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OReportSkeletonComponent } from '../components/report/o-report-skeleton/o-report-skeleton.component';


export const OREPORT_DECLARATION_MODULES: any = [
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
  OReportsTranslatePipe
];
export const OREPORT_IMPORTS_MODULES: any = [
  CommonModule,
  OntimizeWebModule,
  NgxExtendedPdfViewerModule,
  NgxSkeletonLoaderModule,
  FlexLayoutModule,
  DragDropModule
]
export const OREPORT_EXPORT_MODULES: any = [];
export const OREPORT_ENTRY_COMPONENTS_MODULES: any = [
  OReportViewerComponent,
  ReportOnDemandComponent,
  StyleDialogComponent,
  SelectFunctionDialogComponent,
  SavePreferencesDialogComponent,
  ApplyConfigurationDialogComponent
]