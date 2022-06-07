import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { OReportViewerComponent } from '../components/report/o-report-viewer/o-report-viewer.component';
import { OReportService } from './o-report.service';

@Injectable()
export class OFillReportService {

  constructor(
    @Inject('report') private reportService: OReportService,
    protected dialogService: DialogService,
    protected dialog: MatDialog
  ) { }

  openFillReport(reportId: string, parametersValues: object, filter: object) {
    this.reportService.configureService(this.reportService.getDefaultServiceConfiguration());
    this.reportService.configureAdapter();
    let kv = { 'UUID': reportId };
    this.reportService.query(kv, null, 'getReport', {}).subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          let parameters = res.data[0].PARAMETERS;
          if (parameters.length > 0) {
            let av = [reportId];
            let values = Object.values(parametersValues);
            for (let value of values) {
              av.push(value);
            }
            this.dialog.open(OReportViewerComponent, {
              height: '90%',
              width: '80%',
              data: {
                'params': av,
                'filter': filter
              }
            });
          } else {
            let av = [reportId];
            this.dialog.open(OReportViewerComponent, {
              height: '90%',
              width: '80%',
              data: {
                'params': av,
                'filter': filter
              }
            });
          }
        }
      },
      err => {
        if (this.dialogService) {
          this.dialogService.error('ERROR',
            'SERVER_ERROR_MESSAGE');
        }
        console.log(err);
      }
    );

  }

}
