import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, IReportOnDemandService } from 'ontimize-web-ngx';
import { ReportOnDemandComponent } from '../components/report-on-demand/report-on-demand.component';


@Injectable()
export class OReportOnDemandService implements IReportOnDemandService {

  constructor(
    protected dialogService: DialogService,
    protected dialog: MatDialog
  ) { }

  openReportOnDemand(data, service, entity) {
    this.dialog.open(ReportOnDemandComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '90%',
      width: '70%',
      panelClass: ['o-dialog-class', 'o-table-dialog', 'report-on-demand'],
      data: { columns: data, service: service, entity: entity }
    });
  }

}
