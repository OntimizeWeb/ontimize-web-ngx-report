import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, Util } from 'ontimize-web-ngx';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { ReportService } from './report.service';

@Injectable()
export class FillService {

  constructor(
    @Inject('report') private reportService: ReportService,
    protected dialogService: DialogService,
    protected dialog: MatDialog
  ) { }

  openFillReport(reportId: string, parametersValues: object, filter: object) {
    this.reportService.configureService(this.reportService.getDefaultServiceConfiguration('reportstore'));
    this.reportService.configureAdapter();
    let kv = {'UUID': reportId};
    this.reportService.query(kv, null, 'getReport', {}).subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          let parameters = res.data[0].PARAMETERS;
          if (parameters.length > 0) {
            let av = [reportId];
            let values = Object.values(parametersValues);
            for (let i=0; i<values.length; i++) {
              av.push(values[i]);
            }
            this.dialog.open(ReportViewerComponent, {
              height: '90%',
              width: '80%',
              data: {
                'params': av,
                'filter': filter
              }
            });
          } else {
            let av = [reportId];
            this.dialog.open(ReportViewerComponent, {
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
