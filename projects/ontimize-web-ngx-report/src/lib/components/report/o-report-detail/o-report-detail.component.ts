import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService, OFormComponent, Util } from 'ontimize-web-ngx';
import { OReportViewerComponent } from '../o-report-viewer/o-report-viewer.component';
import { Utils } from '../../../util/utils';
import { OReportStoreParam, OReportStoreParamValue } from '../../../types/report-store-param.type';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';


export type JasperReportParameter = {
  name: string,
  description: string,
  valueClass: string,
  type?: string
}


@Component({
  selector: 'o-report-detail',
  templateUrl: './o-report-detail.component.html'
})
export class OReportDetailComponent {

  @ViewChild('form', { static: false })
  mainForm: OFormComponent;
  paramForm: OFormComponent;
  id: string;
  name: string;

  public parameters: Array<JasperReportParameter>;
  public hasParams: boolean = false;

  protected formCacheSubscription: Subscription;
  protected existChangesSubject = new BehaviorSubject<boolean>(false);
  public existsParameterChanges: Observable<boolean>;

  constructor(
    protected dialogService: DialogService,
    protected dialog: MatDialog,
  ) {
    this.existsParameterChanges = this.existChangesSubject.asObservable();
  }

  @ViewChild('paramForm', { static: false }) set content(content: OFormComponent) {
    if (content) { // initially setter gets called with undefined
      this.paramForm = content;
      this.doSubscription();
    }
  }

  protected doSubscription(): void {
    if (this.hasParams && !this.formCacheSubscription && this.paramForm) {
      this.formCacheSubscription = this.paramForm.getFormCache().onCacheStateChanges.subscribe((value: any) => {
        this.canFillReport();
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.formCacheSubscription) {
      this.formCacheSubscription.unsubscribe();
    }
  }

  private getParameterValues(): Array<OReportStoreParamValue> {
    const parameterValues: Array<OReportStoreParamValue> = [];
    if (this.hasParams) {
      const formValues = this.paramForm.getAttributesValuesToInsert();
      const sqlTypes = this.paramForm.getAttributesSQLTypes();
      for (let currentParam of this.parameters) {
        if (Util.isDefined(formValues[currentParam.name])) {
          let current = {
            name: currentParam.name,
            value: formValues[currentParam.name]
          };
          if (Util.isDefined(sqlTypes[currentParam.name])) {
            current["sqlType"] = sqlTypes[currentParam.name];
          }
          parameterValues.push(current);
        }
      }
    }
    return parameterValues;
  }

  public fillReport() {
    let paramValues:Array<OReportStoreParamValue> = [];
    if (this.hasParams) {
      paramValues = this.getParameterValues();
    }
    const reportStoreParam: OReportStoreParam = {
      parameters: paramValues
    }
    const data = {
      'id': this.id,
      'name': this.name,
      'param': reportStoreParam
    };
    Utils.openModalVisor(this.dialog, OReportViewerComponent, data)

  }

  onDataLoaded(e: object) {
    this.parameters = Util.isArray(e['PARAMETERS']) ? e['PARAMETERS'] : [];
    this.hasParams = !Util.isArrayEmpty(this.parameters);
    this.name = Util.isDefined(e['NAME']) ? e['NAME'] : "";
    this.id = Util.isDefined(e['UUID']) ? e['UUID'] : undefined;
  }

  canFillReport(): void {
    let result = this.mainForm && this.mainForm.formGroup && this.mainForm.formGroup.valid;
    if (this.hasParams) {
      result = result && this.paramForm && this.paramForm.formGroup && this.paramForm.formGroup.valid
    }
    this.existChangesSubject.next(result);
  }

}
