import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OReportColumn } from '../../../types/report-column.type';
import { DEFAULT_COLUMN_STYLE } from '../report-on-demand/report-on-demand.component';


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
    this.reportColumn = data;
    if (this.reportColumn.hasOwnProperty('columnStyle')) {
      this.reportColumn.columnStyle = DEFAULT_COLUMN_STYLE;
    }
  }


  confirm(): void {
    this.dialogo.close(this.reportColumn);
  }

}
