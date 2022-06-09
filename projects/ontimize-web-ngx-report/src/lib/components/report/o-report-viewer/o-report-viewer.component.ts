import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { OReportService } from '../../../services/o-report.service';
import { Constants } from '../../../util/constants';

@Component({
  selector: 'o-report-viewer',
  templateUrl: './o-report-viewer.component.html',
  styleUrls: ['./o-report-viewer.component.scss'],
})
export class OReportViewerComponent {

  public pdf = '';
  public name = '';
  public fullscreen: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OReportViewerComponent>,
    @Inject('report') private reportService: OReportService,
    protected dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reportService.configureService(this.reportService.getDefaultServiceConfiguration());
    this.reportService.configureAdapter();
    this.name = this.data.name;
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
  setFullscreenDialog(): void {
    if (!this.fullscreen) {
      this.dialogRef.updateSize("100%", "100%");
    } else {
      this.dialogRef.updateSize(Constants.DEFAULT_WIDTH_DIALOG, Constants.DEFAULT_HEIGHT_DIALOG);
    }
    this.fullscreen = !this.fullscreen;
  }

}
