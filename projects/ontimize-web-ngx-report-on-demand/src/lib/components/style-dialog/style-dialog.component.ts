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
    @Inject(MAT_DIALOG_DATA) public data: string) { this.name = this.data }
  nameInput: string;
  width: number;
  name: string;
  ordersDataAlignment = [
    { "name": "left", "icon": "format_align_left" },
    { "name": "center", "icon": "format_align_center" },
    { "name": "right", "icon": "format_align_right" }
  ]
  selectedAlignment: "center";
  confirm(): void {
    this.dialogo.close({ "id": this.data, "name": this.nameInput, "width": this.width, "alignment": this.selectedAlignment });
  }
  nameChanged(event) {
    this.nameInput = event;
  }
  widthChanged(event) {
    this.width = event;
  }
  ngOnInit() {
  }

}
