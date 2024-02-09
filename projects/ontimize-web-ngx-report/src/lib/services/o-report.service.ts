import { Injectable, Injector } from "@angular/core";
import { OReportParam } from "../types/report-param.type";
import { Observable, OErrorDialogManager, OntimizeEEService, ServiceRequestParam, ServiceResponse, Util } from 'ontimize-web-ngx';
import { HttpHeaders } from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class OReportService extends OntimizeEEService {
  protected oErrorDialogManager: OErrorDialogManager;

  constructor(protected injector: Injector) {
    super(injector);
    super.configureService(this.getDefaultServiceConfiguration());
    this.oErrorDialogManager = injector.get<OErrorDialogManager>(OErrorDialogManager);
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

  public getPreferences(entity?: string, service?: string): Observable<any> {

    const url = this.urlBase + '/preferences/preferences?entity=' + entity + '&service=' + service + "&type=REPORT";

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


  errorCallBack(httpErrorResponse: any) {
    const error = httpErrorResponse.error;
    if (Util.isObject(error)) {
      if (error['code'] === 1 && Util.isDefined(error['message'])) {
        this.showNotificationError(error['message']);
        return;
      }
    }
    this.showNotificationError('MESSAGES.ERROR_QUERY');

  }

  showNotificationError(error: string) {
    this.oErrorDialogManager.openErrorDialog(error);
  }

  protected bodyCode(resp, observer) {
    if (resp.body['code'] === 3) {
      this.authService.logout();
    } else if (resp.body['code'] === 1) {
      observer.error(resp.body['message']);
    } else if (resp.body['code'] === 0) {
      // RESPONSE
      observer.next(resp.body);
    } else {
      // Unknow state -> error
      observer.error('Service unavailable');
    }
  }

  protected buildHeadersReport(): HttpHeaders {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    const sessionId = this.authService.getSessionInfo().id;
    if (Util.isDefined(sessionId)) {
      headers = headers.append('Authorization', 'Bearer ' + sessionId);
    }
    return headers;
  }

}
