import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, OFormComponent, OTextInputComponent, Util } from 'ontimize-web-ngx';
import { Constants } from '../../../util/constants';
import { OReportViewerComponent } from '../o-report-viewer/o-report-viewer.component';
import { Utils } from '../../../util/utils';

@Component({
  selector: 'o-report-detail',
  templateUrl: './o-report-detail.component.html'
})
export class OReportDetailComponent {

  @ViewChild('form', { static: false })
  mainForm: OFormComponent;
  @ViewChild('paramForm', { static: false })
  paramForm: OFormComponent;
  id: string;
  name: string;

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
    const data = {
      'id': this.id,
      'name': this.name,
      'params': paramValues,
      'filters': {}
    };
    Utils.openModalVisor(this.dialog, OReportViewerComponent, data)

  }

  onDataLoaded(e: object) {
    this.parameters = Util.isArray(e['PARAMETERS']) ? e['PARAMETERS'] : [];
    this.hasParams = !Util.isArrayEmpty(this.parameters);
    this.name = Util.isDefined(e['NAME']) ? e['NAME'] : "";
    this.id = Util.isDefined(e['UUID']) ? e['UUID'] : undefined;
  }

  canFillReport(): boolean {
    const result = this.mainForm && this.mainForm.formGroup && this.mainForm.formGroup.valid;
    if (this.hasParams) {
      return result && this.paramForm && this.paramForm.formGroup && this.paramForm.formGroup.valid
    }
    return result;
  }

}
