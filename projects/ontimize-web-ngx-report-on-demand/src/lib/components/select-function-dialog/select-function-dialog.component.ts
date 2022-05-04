import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-function-dialog',
  templateUrl: './select-function-dialog.component.html'
})
export class SelectFunctionDialogComponent {
  public selectedFunction: String;
  public functions = ['SUM', 'AVG', 'MAX', 'MIN'];
  constructor(
    public dialogo: MatDialogRef<SelectFunctionDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public mensaje: String) {
  }


  public save(): void {
    this.dialogo.close(this.selectedFunction);
  }

}
