import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, IReportOnDemandService, OTableComponent } from 'ontimize-web-ngx';
import { ReportOnDemandComponent } from '../components/report-on-demand/report-on-demand/report-on-demand.component';
import { Constants } from '../util/constants';


@Injectable({ providedIn: 'root' })
export class OReportOnDemandService implements IReportOnDemandService {

  constructor(
    protected dialogService: DialogService,
    protected dialog: MatDialog
  ) { }

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

}
