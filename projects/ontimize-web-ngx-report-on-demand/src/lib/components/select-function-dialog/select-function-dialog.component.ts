import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-function-dialog',
  templateUrl: './select-function-dialog.component.html',
  styleUrls: ['./select-function-dialog.component.scss'],
})
export class SelectFunctionDialogComponent {
  public selectedFunction: String;
  public functions = ['DIALOG.SELECT_FUNCTION.SUM', 'DIALOG.SELECT_FUNCTION.AVG', 'DIALOG.SELECT_FUNCTION.MAX', 'DIALOG.SELECT_FUNCTION.MIN'];
  constructor(
    public dialogo: MatDialogRef<SelectFunctionDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public mensaje: String) {
  }


  public save(): void {
    this.dialogo.close(this.selectedFunction);
  }

}
