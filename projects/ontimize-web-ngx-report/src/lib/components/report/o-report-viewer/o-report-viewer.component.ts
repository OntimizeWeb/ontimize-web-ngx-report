import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { OReportService } from '../../../services/o-report.service';
import { Utils } from '../../../util/utils';

@Component({
  selector: 'o-report-viewer',
  templateUrl: './o-report-viewer.component.html',
  styleUrls: ['./o-report-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OReportViewerComponent {

  public pdf = '';
  public name = '';
  public fullscreen: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OReportViewerComponent>,
    private reportService: OReportService,
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
    Utils.setFullscreenDialog(this.fullscreen, this.dialogRef);
    this.fullscreen = !this.fullscreen;
  }
}
