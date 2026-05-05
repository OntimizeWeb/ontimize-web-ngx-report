import { Component, Inject, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OReportFunction } from '../../../types/report-function.type';

@Component({
  selector: 'app-select-function-dialog',
  templateUrl: './select-function-dialog.component.html',
  styleUrls: ['./select-function-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatRadioModule, FormsModule, OntimizeWebModule],
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
