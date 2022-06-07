import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { OReportService } from '../../../services/o-report.service';

@Component({
  selector: 'o-report-viewer',
  templateUrl: './o-report-viewer.component.html'
})
export class OReportViewerComponent implements OnInit {

  public pdf = '';

  constructor(
    @Inject('report') private reportService: OReportService,
    protected dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reportService.configureService(this.reportService.getDefaultServiceConfiguration());
    this.reportService.configureAdapter();
    this.reportService.fillReport(this.data['params'], 'fillReport', {}, this.data['filter']).subscribe(
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
    //ngOnInit implementation
  }


}
