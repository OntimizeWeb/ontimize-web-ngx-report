import { Component, Injector, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AppConfig,
  createServiceInstance,
  DialogService,
  OConfigureServiceArgs,
  OFileInputComponent,
  OFormComponent,
  OntimizeService,
  OTextInputComponent,
  Util
} from 'ontimize-web-ngx';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { OReportStoreService } from '../../../services/o-report-store.service';
import { OReportStoreParam, OReportStoreParamValue } from '../../../types/report-store-param.type';
import { Utils } from '../../../util/utils';
import { OReportViewerComponent } from '../o-report-viewer/o-report-viewer.component';


export type JasperReportParameter = {
  reportParameterName: string,
  reportParameterDescription: string,
  reportParameterValueClass: string,
  reportParameterType?: string
}

@Component({
  selector: 'o-report-detail',
  templateUrl: './o-report-detail.component.html'
})
export class OReportDetailComponent implements OnDestroy {

  paramForm: OFormComponent;
  id: string;

  public parameters: Array<JasperReportParameter>;
  public hasParams: boolean = false;

  protected formCacheSubscription: Subscription;
  protected existChangesSubject = new BehaviorSubject<boolean>(false);
  public existsParameterChanges: Observable<boolean>;
  loading: boolean = false;

  @ViewChild('form', { static: true })
  form: OFormComponent;

  name:string=''

  @ViewChild('type', { static: true })
  type: OTextInputComponent;

  @ViewChild('description', { static: true })
  description: OTextInputComponent;

  @ViewChild('file', { static: true })
  file: OFileInputComponent;

  appConfig: AppConfig;
  reportParameterService: OntimizeService;

  constructor(
    protected dialogService: DialogService,
    protected dialog: MatDialog,
    protected injector: Injector
  ) {
    this.existsParameterChanges = this.existChangesSubject.asObservable();
    this.appConfig = this.injector.get(AppConfig);
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
        if (Util.isDefined(formValues[currentParam.reportParameterName])) {
          let current = {
            name: currentParam.reportParameterName,
            value: formValues[currentParam.reportParameterName]
          };
          if (Util.isDefined(sqlTypes[currentParam.reportParameterName])) {
            current["sqlType"] = sqlTypes[currentParam.reportParameterName];
          }
          parameterValues.push(current);
        }
      }
    }
    return parameterValues;
  }

  public fillReport() {
    let paramValues: Array<OReportStoreParamValue> = [];
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
    const { REPORTUUID, REPORTNAME, PARAMETERS } = e as any;

    if (Util.isJsonApiService(this.injector)) {
      this.reportParameterService = createServiceInstance(this.appConfig.getConfiguration().serviceType, this.injector);
      this.reportParameterService.configureService(this.reportParameterService.getDefaultServiceConfiguration('reportparameter'));
      this.reportParameterService.query({ filter: { 'REPORTUUID': e['REPORTUUID'] } }).subscribe(resp => {
        if (resp.isSuccessful() && Util.isArray(resp.data) && resp.data.length > 0) {
          this.parameters = resp.data.map(({ REPORTPARAMETERNAME, REPORTPARAMETERDESCRIPTION, REPORTPARAMETERVALUECLASS, REPORTPARAMETERTYPE }) => ({
            reportParameterName: REPORTPARAMETERNAME,
            reportParameterDescription: REPORTPARAMETERDESCRIPTION,
            reportParameterValueClass: REPORTPARAMETERVALUECLASS,
            reportParameterType: REPORTPARAMETERTYPE
          }));
        } else {
          this.parameters = [];
        }

        this.finalizeDataLoading(REPORTNAME, REPORTUUID);
      });
    } else {

      this.parameters = Util.isArray(PARAMETERS) ? PARAMETERS : [];
      this.finalizeDataLoading(REPORTNAME, REPORTUUID);
    }
  }

  private finalizeDataLoading(reportName?: string, reportUuid?: string) {
    this.hasParams = !!this.parameters.length;
    this.id = reportUuid ?? undefined;
    this.name = reportName ?? ''

    if (!this.hasParams) {
      this.canFillReport();
    }
  }

  onError() {
    if (this.dialogService) {
      this.dialogService.error('ERROR',
        'SERVER_ERROR_MESSAGE');
      this.loading = false;
    }
  }

  canFillReport(): void {
    let result = this.form?.formGroup?.valid;
    if (this.hasParams) {
      result = result && this.paramForm?.formGroup?.valid
    }
    this.existChangesSubject.next(result);
  }

  configureServiceReportStore(): OConfigureServiceArgs {
    return { baseService: OReportStoreService, entity: 'report' };
  }

  configureServiceReportParameter(): OConfigureServiceArgs {
    return { baseService: OReportStoreService, entity: 'reportparameter' };
  }

  onBeforeUpdate(data) {

    if (Util.isDefined(this.form.getDataValue('REPORTID'))) {
      data['REPORTID'] = this.form.getDataValue('REPORTID').value;
    }
    console.log('onBeforeUpdate => ', data);
  }
}
