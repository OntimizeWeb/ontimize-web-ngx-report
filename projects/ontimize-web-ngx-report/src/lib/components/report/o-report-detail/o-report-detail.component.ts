import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, OColumnComponent, OFormComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { OReportViewerComponent } from '../o-report-viewer/o-report-viewer.component';
import { OReportService } from '../o-report.service';

@Component({
  selector: 'o-report-detail',
  templateUrl: './o-report-detail.component.html',
  styleUrls: ['./o-report-detail.component.scss']
})
export class OReportDetailComponent implements OnInit {

  @ViewChild('id', { static: true })
  id: OTextInputComponent;
  @ViewChild('paramForm', { static: false })
  paramForm: OFormComponent;

  private values: string [];

  public parameters: [];
  private av: string [];
  public hasParams: boolean = false;

  constructor(
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
      let size = this.values.length;
      for (let i = 0; i<size; i++)
        this.av.push(this.values.shift());
    }

    if (this.av.includes(undefined) || this.av.includes("")) {
      if (this.dialogService) {
        this.dialogService.error('ERROR',
          'NO_PARAMETER_VALUE_MESSAGE');
      }
    } else {
      this.dialog.open(OReportViewerComponent, {
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
