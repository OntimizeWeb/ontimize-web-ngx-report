import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService, Util } from 'ontimize-web-ngx';
import { OReportService } from '../../../services/o-report.service';
import { Utils } from '../../../util/utils';

@Component({
  selector: 'o-report-viewer',
  templateUrl: './o-report-viewer.component.html',
  styleUrls: ['./o-report-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-report-viewer]': 'true'
  }
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
    this.name = Util.isDefined(this.data['name']) ? this.data.name : '';

    const uuid = this.data['id'];
    const kv = Util.isDefined(this.data['filters']) ? this.data['filters'] : {};
    const av = Util.isDefined(this.data['params']) ? this.data['params'] : [];
    this.reportService.fillReport(uuid, kv, av, 'fillReport', {},).subscribe(
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
