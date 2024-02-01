import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, OFormComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { Constants } from '../../../util/constants';
import { OReportViewerComponent } from '../o-report-viewer/o-report-viewer.component';
import { Utils } from '../../../util/utils';

@Component({
  selector: 'o-report-detail',
  templateUrl: './o-report-detail.component.html'
})
export class OReportDetailComponent {

  @ViewChild('id', { static: true })
  id: OTextInputComponent;
  @ViewChild('paramForm')
  paramForm: OFormComponent;
  name: string;

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
    const data = { 'params': this.av, 'filter': {}, name: this.name };
    Utils.openModalVisor(this.dialog, OReportViewerComponent, data)

  }

  onDataLoaded(e: object) {
    this.parameters = e['PARAMETERS'];
    this.name = e['NAME'];
    if (this.parameters.length > 0) {
      this.hasParams = true;
    }
  }

}
