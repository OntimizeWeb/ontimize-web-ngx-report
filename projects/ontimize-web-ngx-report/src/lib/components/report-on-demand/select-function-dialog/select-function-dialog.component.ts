import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OReportFunction } from '../../../types/report-function.type';

@Component({
  selector: 'app-select-function-dialog',
  templateUrl: './select-function-dialog.component.html',
  styleUrls: ['./select-function-dialog.component.scss'],
})
export class SelectFunctionDialogComponent {
  public selectedFunction: OReportFunction;
  public functions: { id: OReportFunction, value: string }[] = [
    { id: { columnName: this.reportFunction.columnName, type: 'SUM' }, value: 'DIALOG.SELECT_FUNCTION.SUM' },
    { id: { columnName: this.reportFunction.columnName, type: 'AVERAGE' }, value: 'DIALOG.SELECT_FUNCTION.AVG' },
    { id: { columnName: this.reportFunction.columnName, type: 'MAX' }, value: 'DIALOG.SELECT_FUNCTION.MAX' },
    { id: { columnName: this.reportFunction.columnName, type: 'MIN' }, value: 'DIALOG.SELECT_FUNCTION.MIN' }];
  constructor(
    public dialogo: MatDialogRef<SelectFunctionDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public reportFunction: OReportFunction) {
    this.selectedFunction = reportFunction;
  }


  public save(): void {
    this.dialogo.close(this.selectedFunction);
  }
  public isCheckedFunction(reportFunction: OReportFunction) {
    return reportFunction.type == this.selectedFunction.type;

  }
}
