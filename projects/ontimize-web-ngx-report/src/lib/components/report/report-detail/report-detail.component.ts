import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, OColumnComponent, OFormComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { ReportViewerComponent } from '../report-viewer/report-viewer.component';
import { ReportService } from '../report.service';

@Component({
  selector: 'o-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  providers: [ReportService]
})
export class ReportDetailComponent implements OnInit {

  @ViewChild('id', { static: true })
  id: OTextInputComponent;
  // @ViewChild('form', { static: false })
  // form: OFormComponent;
  @ViewChild('paramForm', { static: false })
  paramForm: OFormComponent;
  // @ViewChild('params', { static: false })
  // params: OColumnComponent;

  private values: string [];

  public parameters: [];
  private av: string [];
  public hasParams: boolean = false;

  constructor(
    private reportService: ReportService,
    protected dialogService: DialogService,
    protected dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  private getValues() {
    for (let i = 0; i<this.parameters.length; i++) {
      let v = this.paramForm.getFieldValue('value' + i);
      this.values.push(v);
    }
  }

  public fillReport() {
    this.values = [];
    this.av = [this.id.getValue()]
    if (this.parameters.length > 0) {
      this.getValues();
      for (let i = 0; i<=this.values.length; i++)
        this.av.push(this.values.shift());
    }

    if (this.av.includes(undefined) || this.av.includes("")) {
      if (this.dialogService) {
        this.dialogService.error('ERROR',
          'NO_PARAMETER_VALUE_MESSAGE');
      }
    } else {
      this.dialog.open(ReportViewerComponent, {
        height: '780px',
        width: '1240px',
        data: {
          'params': this.av,
          'filter': {}
        }
      });
    }
  }

  onDataLoaded(e: object) {
    this.parameters = e['PARAMETERS'];
    if (this.parameters.length > 0) {
      this.hasParams = true;
    }
  }

}
