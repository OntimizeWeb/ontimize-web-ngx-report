import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService, OFormComponent } from 'ontimize-web-ngx';
import { ReportViewerComponent } from '../report-viewer/report-viewer.component';

@Component({
  selector: 'o-report-fill',
  templateUrl: './report-fill.component.html',
  styleUrls: ['./report-fill.component.css']
})
export class ReportFillComponent implements OnInit {

  @ViewChild('form', { static: false })
  form: OFormComponent;

  private av: string [];
  public parameters: [];
  private values: string [];

  constructor(
    protected dialog: MatDialog,
    protected dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.parameters = data.parameters;
    }

  ngOnInit() {
  }

  private getValues() {
    for (let i = 0; i<this.parameters.length; i++) {
      let v = this.form.getFieldValue('value' + i);
      this.values.push(v);
    }
  }

  public fillReport() {
    this.values = [];
    if (this.parameters.length > 0) {
      this.getValues();
      this.av = [this.data.reportId]
      for (let i = 0; i<=this.values.length; i++)
        this.av.push(this.values.shift());
    }

    if (this.av.includes(undefined) || this.av.includes("")) {
      if (this.dialogService) {
        this.dialogService.error('Error!',
          'No parameter values provided.');
      }
    } else {
      this.dialog.open(ReportViewerComponent, {
        height: '780px',
        width: '1240px',
        data: this.av
      });
    }
  }

}
