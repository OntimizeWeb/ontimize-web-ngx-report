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
    @Optional() @Inject(MAT_DIALOG_DATA) public data: OReportColumn) {

    this.reportColumn = Utils.cloneObject(data);

    if (this.reportColumn.columnStyle && !Util.isDefined(this.reportColumn.columnStyle.width)) {
      this.reportColumn.columnStyle.width = Constants.DEFAULT_WIDTH_COLUMN_STYLE;
    }
    if (this.reportColumn.columnStyle && !Util.isDefined(this.reportColumn.columnStyle.alignment)) {
      this.reportColumn.columnStyle.alignment = Constants.DEFAULT_ALIGNMENT_COLUMN_STYLE;
    }
    if (!this.reportColumn.columnStyle) {
      this.reportColumn.columnStyle = { width: Constants.DEFAULT_WIDTH_COLUMN_STYLE, alignment: Constants.DEFAULT_ALIGNMENT_COLUMN_STYLE }
    }
  }

  confirm(): void {
    this.dialogo.close(this.reportColumn);
  }

}
