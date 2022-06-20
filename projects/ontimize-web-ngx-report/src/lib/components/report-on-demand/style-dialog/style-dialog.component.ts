import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Util } from 'ontimize-web-ngx';
import { OReportColumn } from '../../../types/report-column.type';
import { Constants } from '../../../util/constants';
import { Utils } from '../../../util/utils';

@Component({
  selector: 'app-style-dialog',
  templateUrl: './style-dialog.component.html'
})
export class StyleDialogComponent {

  public reportColumn: OReportColumn;

  public dataAlignment = [
    { "name": "left", "icon": "format_align_left" },
    { "name": "center", "icon": "format_align_center" },
    { "name": "right", "icon": "format_align_right" }
  ]

  constructor(
    @Optional() public dialogo: MatDialogRef<StyleDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.reportColumn = Utils.cloneObject(data);
    if (!this.reportColumn.hasOwnProperty('columnStyle') || !Util.isDefined(this.reportColumn.columnStyle) ) {
      this.reportColumn.columnStyle = Object.assign({}, Constants.DEFAULT_COLUMN_STYLE);
    }
  }

  confirm(): void {
    this.dialogo.close(this.reportColumn);
  }

}
