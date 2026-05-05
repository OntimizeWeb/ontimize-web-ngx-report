import { Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, IReportService } from 'ontimize-web-ngx';
import { OTableBase } from 'ontimize-web-ngx/lib/components/table/o-table-base.class';
import { ReportOnDemandComponent } from '../components/report-on-demand/report-on-demand/report-on-demand.component';
import { Utils } from '../util/utils';


@Injectable()
export class OntimizeReportService implements IReportService {
  protected dialogService: DialogService;
  protected dialog: MatDialog;

  constructor(
    private injector: Injector
  ) {
    this.dialogService = this.injector.get<DialogService>(DialogService);
    this.dialog = this.injector.get<MatDialog>(MatDialog);
  }

  openReportOnDemand(table: OTableBase) {
    Utils.openModalVisor(this.dialog, ReportOnDemandComponent, table);
  }

}
