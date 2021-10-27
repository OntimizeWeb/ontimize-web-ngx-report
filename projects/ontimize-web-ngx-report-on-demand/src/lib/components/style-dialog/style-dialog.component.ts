import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OTextInputComponent } from 'ontimize-web-ngx';
@Component({
  selector: 'app-style-dialog',
  templateUrl: './style-dialog.component.html',
  styleUrls: ['./style-dialog.component.css']
})
export class StyleDialogComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<StyleDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }
  @ViewChild('name', { static: true })
  name: OTextInputComponent;
  @ViewChild('width', { static: true })
  width: OTextInputComponent;
  ordersDataAlignment = [
    { "name": "left", "icon": "format_align_left" },
    { "name": "center", "icon": "format_align_center" },
    { "name": "right", "icon": "format_align_right" }
  ]
  selectedAlignment: "center";
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close({ "id": this.mensaje, "name": this.name, "width": this.width, "alignment": this.selectedAlignment });
  }

  ngOnInit() {
  }

}
