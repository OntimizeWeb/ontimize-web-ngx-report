import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-function-dialog',
  templateUrl: './select-function-dialog.component.html',
  styleUrls: ['./select-function-dialog.component.css']
})
export class SelectFunctionDialogComponent implements OnInit {
  selectedFunction: String;
  functions = [];
  constructor(
    public dialogo: MatDialogRef<SelectFunctionDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public mensaje: String) {
    this.functions.push(this.mensaje + '-SUMA');
    this.functions.push(this.mensaje + '-MEDIA');
    this.functions.push(this.mensaje + '-MAXIMO');
    this.functions.push(this.mensaje + '-MINIMO');

  }

  ngOnInit() {
  }
  confirmado(): void {
    this.dialogo.close(this.selectedFunction);
  }

}
