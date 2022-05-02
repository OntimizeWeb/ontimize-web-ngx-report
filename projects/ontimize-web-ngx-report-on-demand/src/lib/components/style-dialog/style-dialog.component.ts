import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OTranslateService, Util } from 'ontimize-web-ngx';

export type ColumnStyleConfiguration = {
  id: string,
  name: string,
  width: number,
  alignment: 'left' | 'right' | 'center'
};

@Component({
  selector: 'app-style-dialog',
  templateUrl: './style-dialog.component.html'
})
export class StyleDialogComponent {

  public columnStyle: ColumnStyleConfiguration;

  public dataAlignment = [
    { "name": "left", "icon": "format_align_left" },
    { "name": "center", "icon": "format_align_center" },
    { "name": "right", "icon": "format_align_right" }
  ]

  constructor(
    public dialogo: MatDialogRef<StyleDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private oTranslate: OTranslateService) {
    this.initializeDefaultInputsValues(data);
  }

  initializeDefaultInputsValues(data: any) {
    if (Util.isObject(data)) {
      this.columnStyle = data
    } else {
      this.columnStyle = {
        id: data, name: this.oTranslate.get(data), width: 85, alignment: 'left'
      };
    }
  }

  confirm(): void {
    this.dialogo.close(this.columnStyle);
  }

}
