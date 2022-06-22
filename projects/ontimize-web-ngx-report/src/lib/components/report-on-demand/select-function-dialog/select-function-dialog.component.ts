import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OReportFunction } from '../../../types/report-function.type';

@Component({
  selector: 'app-select-function-dialog',
  templateUrl: './select-function-dialog.component.html',
  styleUrls: ['./select-function-dialog.component.scss'],
})
export class SelectFunctionDialogComponent {
  public selectedFunction: string;
  public functions: { id: string, value: string }[] = [
    { id: 'SUM', value: 'DIALOG.SELECT_FUNCTION.SUM' },
    { id: 'AVERAGE', value: 'DIALOG.SELECT_FUNCTION.AVG' },
    { id: 'MAX', value: 'DIALOG.SELECT_FUNCTION.MAX' },
    { id: 'MIN', value: 'DIALOG.SELECT_FUNCTION.MIN' }];
  constructor(
    public dialogo: MatDialogRef<SelectFunctionDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public reportFunction: OReportFunction) {
    this.selectedFunction = reportFunction.type;
  }

  public save(): void {
    this.dialogo.close({ columnName: this.reportFunction.columnName, type: this.selectedFunction });
  }

}
