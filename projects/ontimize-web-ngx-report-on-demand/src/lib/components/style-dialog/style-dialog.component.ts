import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OReportColumnsStyle } from '../../types/report-column-style.type';


@Component({
  selector: 'app-style-dialog',
  templateUrl: './style-dialog.component.html'
})
export class StyleDialogComponent {

  public columnStyle: OReportColumnsStyle;

  public dataAlignment = [
    { "name": "left", "icon": "format_align_left" },
    { "name": "center", "icon": "format_align_center" },
    { "name": "right", "icon": "format_align_right" }
  ]

  constructor(
    public dialogo: MatDialogRef<StyleDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.columnStyle = data;
  }


  confirm(): void {
    this.dialogo.close(this.columnStyle);
  }

}
