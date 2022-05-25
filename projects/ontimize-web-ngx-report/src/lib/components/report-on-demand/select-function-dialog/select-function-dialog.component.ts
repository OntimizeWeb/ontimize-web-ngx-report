import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReportFunction } from '../../../types/report-function.type';

@Component({
  selector: 'app-select-function-dialog',
  templateUrl: './select-function-dialog.component.html',
  styleUrls: ['./select-function-dialog.component.scss'],
})
export class SelectFunctionDialogComponent {
  public selectedFunction: string;
  public functions = [];
  constructor(
    public dialogo: MatDialogRef<SelectFunctionDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public reportFunction: ReportFunction) {

    this.functions.push({ id: reportFunction.columnName + '-SUM', value: 'DIALOG.SELECT_FUNCTION.SUM' });
    this.functions.push({ id: reportFunction.columnName + '-AVERAGE', value: 'DIALOG.SELECT_FUNCTION.AVG' });
    this.functions.push({ id: reportFunction.columnName + '-MAX', value: 'DIALOG.SELECT_FUNCTION.MAX' });
    this.functions.push({ id: reportFunction.columnName + '-MIN', value: 'DIALOG.SELECT_FUNCTION.MIN' });
    this.selectedFunction = reportFunction.columnName + '-' + reportFunction.functionName;
  }


  public save(): void {
    this.dialogo.close(this.selectedFunction);
  }

}
