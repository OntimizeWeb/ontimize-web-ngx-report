import { Inject, Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, IReportService, OTableComponent } from 'ontimize-web-ngx';
import { ReportOnDemandComponent } from '../components/report-on-demand/report-on-demand/report-on-demand.component';
import { OReportViewerComponent } from '../components/report/o-report-viewer/o-report-viewer.component';
import { Constants } from '../util/constants';
import { OReportService } from './o-report.service';


@Injectable({ providedIn: 'root' })
export class OReportOnDemandService implements IReportService {
  protected dialogService: DialogService;
  protected dialog: MatDialog;

  constructor(
    private injector: Injector,
    @Inject('report') private reportService: OReportService,

  ) {
    this.dialogService = this.injector.get(DialogService);
    this.dialog = this.injector.get(MatDialog);
//    this.reportService = this.injector.get(OReportService)
  }

  openReportOnDemand(table: OTableComponent) {
    this.dialog.open(ReportOnDemandComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: Constants.DEFAULT_HEIGHT_DIALOG,
      width: Constants.DEFAULT_WIDTH_DIALOG,
      panelClass: ['o-dialog-class', 'o-table-dialog', 'report-on-demand'],
      data: table
    });
  }

  openFillReport(reportId: string, parametersValues: object, filter: object) {
    this.reportService.configureService(this.reportService.getDefaultServiceConfiguration());
    this.reportService.configureAdapter();
    let kv = { 'UUID': reportId };
    this.reportService.query(kv, null, 'getReport', {}).subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          let parameters = res.data[0].PARAMETERS;
          let name = res.data[0].NAME;
          if (parameters.length > 0) {
            let av = [reportId];
            let values = Object.values(parametersValues);
            for (let value of values) {
              av.push(value);
            }
            this.openDialog(av, filter, name);
          } else {
            let av = [reportId];
            this.openDialog(av, filter, name);
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
  openDialog(av: any, filter: any, name: any) {
    this.dialog.open(OReportViewerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: Constants.DEFAULT_HEIGHT_DIALOG,
      width: Constants.DEFAULT_WIDTH_DIALOG,
      panelClass: ['o-dialog-class', 'o-table-dialog'],
      data: {
        'params': av,
        'filter': filter,
        'name': name
      }
    });
  }
}
