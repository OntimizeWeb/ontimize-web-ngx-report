import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { OReportNewComponent, OReportDetailComponent, OReportViewerComponent, OReportHomeComponent } from '../components/report/index';
import { ReportOnDemandComponent, StyleDialogComponent, SelectFunctionDialogComponent, SavePreferencesDialogComponent, ApplyConfigurationDialogComponent } from '../components/report-on-demand/index';
import { OReportRoutingModule } from '../components/report/o-report-routing.module';
import { OReportsTranslatePipe } from '../util';


export const OREPORT_DECLARATION_MODULES: any = [
  OReportHomeComponent,
  OReportNewComponent,
  OReportDetailComponent,
  OReportViewerComponent,
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
  OReportRoutingModule,
  NgxExtendedPdfViewerModule,
  FlexLayoutModule,
  DragDropModule
]
export const OREPORT_EXPORT_MODULES: any = [
  OReportHomeComponent,
  OReportNewComponent,
  OReportDetailComponent,
  OReportViewerComponent,
  OReportRoutingModule,
  ReportOnDemandComponent,
  OReportsTranslatePipe
];
export const OREPORT_ENTRY_COMPONENTS_MODULES: any = [
  OReportViewerComponent,
  ReportOnDemandComponent,
  StyleDialogComponent,
  SelectFunctionDialogComponent,
  SavePreferencesDialogComponent,
  ApplyConfigurationDialogComponent
]