import { Injectable, Injector } from "@angular/core";
import { Observable, OErrorDialogManager, OntimizeEEService, ServiceRequestParam, ServiceResponse } from 'ontimize-web-ngx';
import { OReportParam } from "../types/report-param.type";
@Injectable({ providedIn: 'root' })
export class ReportsService extends OntimizeEEService {
  public oErrorDialogManager: OErrorDialogManager;
  constructor(protected injector: Injector) {
    super(injector);
    super.configureService(this.getDefaultServiceConfiguration());
    this.oErrorDialogManager = injector.get(OErrorDialogManager);
  }

  public createReport(reportparams: OReportParam): Observable<any> {

    const body = JSON.stringify(
      reportparams
    )
    const url = this.urlBase + '/dynamicjasper/report';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  public saveAsPreferences(preferencesparams?: object): Observable<any> {
    const body = JSON.stringify(
      preferencesparams
    )
    const url = this.urlBase + '/preferences/save';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  public savePreferences(id: number, preferencesparams?: object): Observable<any> {
    const body = JSON.stringify(
      preferencesparams
    )
    const url = this.urlBase + '/preferences/update/' + id;

    return this.doRequest({
      method: 'PUT',
      url: url,
      body: body
    });
  }

  public getPreferences(): Observable<any> {

    const url = this.urlBase + '/preferences/preferences';

    return this.doRequest({
      method: 'GET',
      url: url
    });

  }
  public getFunctions(functionparams?: object): Observable<any> {

    const body = JSON.stringify(
      functionparams
    )
    const url = this.urlBase + '/dynamicjasper/functionsName';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  public deletePreferences(id?: number): Observable<any> {

    const url = this.urlBase + '/preferences/remove/' + id;
    return this.doRequest({
      method: 'DELETE',
      url: url
    });

  }

  /** overridden method to add error callback for all requests */
  doRequest(param: ServiceRequestParam): Observable<ServiceResponse> {
    return super.doRequest({
      method: param.method,
      url: param.url,
      body: param.body,
      errorCallBack: this.errorCallBack
    });
  }


  errorCallBack(error: any) {
    this.oErrorDialogManager.openErrorDialog(error);
  }

}
