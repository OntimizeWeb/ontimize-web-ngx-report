import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, OFormComponent, OTextInputComponent, Util } from 'ontimize-web-ngx';
import { Constants } from '../../../util/constants';
import { OReportViewerComponent } from '../o-report-viewer/o-report-viewer.component';

@Component({
  selector: 'o-report-detail',
  templateUrl: './o-report-detail.component.html'
})
export class OReportDetailComponent {

  @ViewChild('id', { static: true })
  id: OTextInputComponent;
  @ViewChild('name', { static: true })
  name: OTextInputComponent;
  @ViewChild('form', { static: false })
  mainForm: OFormComponent;
  @ViewChild('paramForm', { static: false })
  paramForm: OFormComponent;

  // private values: string[];

  public parameters: [];
  // private av: string[];
  public hasParams: boolean = false;

  constructor(
    protected dialogService: DialogService,
    protected dialog: MatDialog,
  ) { }


  private getParameterValues(): Array<any> {
    const values = [];
    if(this.hasParams) {
      for (let i = 0; i < this.parameters.length; i++) {
        let v = this.paramForm.getFieldValue('value' + i);
        values.push(v);
      }
    }
    return values;
  }

  public fillReport() {
    let paramValues = [];
    if (this.hasParams) {
      paramValues = this.getParameterValues();
    }

    this.dialog.open(OReportViewerComponent, {
      height: Constants.DEFAULT_HEIGHT_DIALOG,
      width: Constants.DEFAULT_HEIGHT_DIALOG,
      data: {
        'id': this.id.getValue(),
        'name': this.name.getValue(),
        'params': paramValues,
        'filters': {}
      }

    });
  }

  onDataLoaded(e: object) {
    this.parameters = Util.isArray(e['PARAMETERS']) ? e['PARAMETERS'] : [];
    this.hasParams = !Util.isArrayEmpty(this.parameters);
  }

  canFillReport() : boolean {
    const result = this.mainForm && this.mainForm.formGroup && this.mainForm.formGroup.valid;
    if(this.hasParams) {
      return result && this.paramForm && this.paramForm.formGroup && this.paramForm.formGroup.valid
    }
    return result;
  }

}
