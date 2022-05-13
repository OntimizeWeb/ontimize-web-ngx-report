import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-function-dialog',
  templateUrl: './select-function-dialog.component.html',
  styleUrls: ['./select-function-dialog.component.scss'],
})
export class SelectFunctionDialogComponent {
  public selectedFunction: any;
  public functions = [];
  constructor(
    public dialogo: MatDialogRef<SelectFunctionDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public mensaje: String) {
    this.functions.push({ id: this.mensaje + '-SUM', value: 'DIALOG.SELECT_FUNCTION.SUM' });
    this.functions.push({ id: this.mensaje + '-AVERAGE', value: 'DIALOG.SELECT_FUNCTION.AVG' });
    this.functions.push({ id: this.mensaje + '-MAX', value: 'DIALOG.SELECT_FUNCTION.MAX' });
    this.functions.push({ id: this.mensaje + '-MIN', value: 'DIALOG.SELECT_FUNCTION.MIN' });
  }


  public save(): void {
    this.dialogo.close(this.selectedFunction);
  }

}
