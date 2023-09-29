import { Injectable, Injector } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogService } from "ontimize-web-ngx";
import { OReportViewerComponent } from "../components/report/o-report-viewer/o-report-viewer.component";
import { Utils } from "../util/utils";
import { OReportService } from "./o-report.service";

@Injectable()
export class OReportStoreService {
  private reportService: OReportService;
  protected dialogService: DialogService;
  protected dialog: MatDialog
  constructor(
    private injector: Injector
  ) {
    this.dialogService = this.injector.get<DialogService>(DialogService);
    this.dialog = this.injector.get<MatDialog>(MatDialog);
    this.reportService = this.injector.get<OReportService>(OReportService);
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
          let av = [];
          if (parameters.length > 0) {
            av = [reportId];
            let values = Object.values(parametersValues);
            for (let value of values) {
              av.push(value);
            }
          } else {
            av = [reportId];
          }
          const data = { 'params': av, 'filter': filter, 'name': name };
          Utils.openModalVisor(this.dialog, OReportViewerComponent, data)

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