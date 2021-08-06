import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DEFAULT_INPUTS_O_BUTTON, DialogService, OButtonComponent, OTextInputComponent, Util } from 'ontimize-web-ngx';
import { ReportFillComponent } from '../report-fill/report-fill.component';
import { ReportViewerComponent } from '../report-viewer/report-viewer.component';
import { ReportService } from '../report.service';

export const DEFAULT_INPUTS_O_REPORT_BUTTON = [
  ...DEFAULT_INPUTS_O_BUTTON,
  'reportId',
  'parametersValues'
];

@Component({
  selector: 'o-report-button',
  inputs: DEFAULT_INPUTS_O_REPORT_BUTTON,
  templateUrl: './o-report-button.component.html',
  styleUrls: ['./o-report-button.component.css'],
  providers: [ReportService]
})
export class OReportButtonComponent extends OButtonComponent implements OnInit {

  public parameters: [];
  private av: string [];
  protected reportId: string;
  protected parametersValues: object;

  // @ViewChild('id', { static: true })
  // id: OTextInputComponent;

  constructor(
    private reportService: ReportService,
    protected dialogService: DialogService,
    protected dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
  }

  public openFillReport() {
    this.reportService.configureService(this.reportService.getDefaultServiceConfiguration('reportstore'));
    this.reportService.configureAdapter();
    let kv = {'id': this.reportId};
    this.reportService.query(kv, null, 'getReport', {}).subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          this.parameters = res.data[0].parameters;
          if (this.parameters.length > 0) {
            if (!Util.isDefined(this.parametersValues)) {
              this.dialog.open(ReportFillComponent, {
                height: '520px',
                width: '620px',
                data: {
                  'reportId': this.reportId,
                  'parameters': this.parameters
                }
              });
            } else {
              this.av = [this.reportId];
              let values = Object.values(this.parametersValues);
              for (let i=0; i<values.length; i++) {
                this.av.push(values[i]);
              }
              this.dialog.open(ReportViewerComponent, {
                height: '90%',
                width: '80%',
                data: this.av
              });
            }
          } else {
            this.av = [this.reportId];
            this.dialog.open(ReportViewerComponent, {
              height: '90%',
              width: '80%',
              data: this.av
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
