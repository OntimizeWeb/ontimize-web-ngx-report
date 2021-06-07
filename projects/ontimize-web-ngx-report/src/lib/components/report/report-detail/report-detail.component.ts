import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, OTextInputComponent } from 'ontimize-web-ngx';
import { ReportFillComponent } from '../report-fill/report-fill.component';
import { ReportViewerComponent } from '../report-viewer/report-viewer.component';
import { ReportService } from '../report.service';

@Component({
  selector: 'o-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css'],
  providers: [ReportService]
})
export class ReportDetailComponent implements OnInit {

  @ViewChild('id', { static: true })
  id: OTextInputComponent;

  public parameters: [];
  private av: string [];

  constructor(
    private reportService: ReportService,
    protected dialogService: DialogService,
    protected dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public openFillReport() {
    this.reportService.configureService(this.reportService.getDefaultServiceConfiguration('reportstore'));
    this.reportService.configureAdapter();
    let kv = {'id': this.id.getValue()};
    this.reportService.query(kv, null, 'getReport', {}).subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          this.parameters = res.data[0].parameters;
          if (this.parameters.length > 0) {
            this.dialog.open(ReportFillComponent, {
              height: '520px',
              width: '620px',
              data: {
                'reportId': this.id.getValue(),
                'parameters': this.parameters
              }
            });
          } else {
            this.av = [this.id.getValue()];
            this.dialog.open(ReportViewerComponent, {
              height: '780px',
              width: '1240px',
              data: this.av
            });
          }
        }
      },
      err => {
        if (this.dialogService) {
          this.dialogService.error('Error!',
              'Something went wrong.');
          }
          console.log(err);
      }
    );
  }

}
