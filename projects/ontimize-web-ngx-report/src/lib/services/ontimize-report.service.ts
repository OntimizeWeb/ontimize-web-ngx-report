import { Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, IReportService, OTableComponent } from 'ontimize-web-ngx';
import { ReportOnDemandComponent } from '../components/report-on-demand/report-on-demand/report-on-demand.component';
import { Utils } from '../util/utils';


@Injectable({ providedIn: 'root' })
export class OntimizeReportService implements IReportService {
  protected dialogService: DialogService;
  protected dialog: MatDialog;

  constructor(
    private injector: Injector
  ) {
    this.dialogService = this.injector.get<DialogService>(DialogService);
    this.dialog = this.injector.get<MatDialog>(MatDialog);
  }

  openReportOnDemand(table: OTableComponent) {
    Utils.openModalVisor(this.dialog, ReportOnDemandComponent, table);
  }

}
