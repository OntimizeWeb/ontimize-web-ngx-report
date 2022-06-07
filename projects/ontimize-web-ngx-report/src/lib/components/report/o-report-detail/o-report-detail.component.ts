import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, OFormComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { DEFAULT_HEIGHT_DIALOG } from '../../report-on-demand';
import { OReportViewerComponent } from '../o-report-viewer/o-report-viewer.component';

@Component({
  selector: 'o-report-detail',
  templateUrl: './o-report-detail.component.html'
})
export class OReportDetailComponent {

  @ViewChild('id', { static: true })
  id: OTextInputComponent;
  @ViewChild('paramForm', { static: false })
  paramForm: OFormComponent;

  private values: string[];

  public parameters: [];
  private av: string[];
  public hasParams: boolean = false;

  constructor(
    protected dialogService: DialogService,
    protected dialog: MatDialog,
  ) { }


  private getValues() {
    for (let i = 0; i < this.parameters.length; i++) {
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
      for (let i = 0; i < size; i++)
        this.av.push(this.values.shift());
    }


    this.dialog.open(OReportViewerComponent, {
      height: DEFAULT_HEIGHT_DIALOG,
      width: DEFAULT_HEIGHT_DIALOG,
      data: {
        'params': this.av,
        'filter': {}
      }

    });
  }

  onDataLoaded(e: object) {
    this.parameters = e['PARAMETERS'];
    if (this.parameters.length > 0) {
      this.hasParams = true;
    }
  }

}
