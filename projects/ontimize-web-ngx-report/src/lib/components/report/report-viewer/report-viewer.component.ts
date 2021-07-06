import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { ReportService } from '../report.service';

@Component({
  selector: 'o-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css'],
  providers: [ReportService]
})
export class ReportViewerComponent implements OnInit {

  public pdf: string;

  constructor(
    private reportService: ReportService,
    protected dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.reportService.configureService(this.reportService.getDefaultServiceConfiguration('reportstore'));
      this.reportService.configureAdapter();
      this.reportService.fillReport(this.data, 'fillReport', {}).subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          this.pdf = res.data[0].file;
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

  ngOnInit() {
  }


}
