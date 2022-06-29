import { Injectable, Injector } from "@angular/core";
import { OReportParam } from "../types/report-param.type";
import { Observable, OErrorDialogManager, OntimizeEEService, ServiceRequestParam, ServiceResponse, Util } from 'ontimize-web-ngx';
import { HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { share } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OReportService extends OntimizeEEService {
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

  public getPreferences(entity?: string, service?: string): Observable<any> {

    const url = this.urlBase + '/preferences/preferences?entity=' + entity + '&service=' + service;

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

  upload(files: any[], entity: string, data?: object): Observable<any> {
    const dataObservable = new Observable(observer => {

      let url = `${this.urlBase}/reportstore/${entity}`;

      const toUpload: any = new FormData();
      files.forEach(item => {
        item.prepareToUpload();
        item.isUploading = true;
        toUpload.append('name', item.name);
        toUpload.append('file', item.file);
      });

      if (data) {
        toUpload.append('data', JSON.stringify(data));
      }

      const request = new HttpRequest('POST', url, toUpload, {
        headers: this.buildHeadersReport(),
        reportProgress: true
      });

      this.httpClient.request(request).subscribe(resp => {
        if (HttpEventType.UploadProgress === resp.type) {
          // Upload progress event received
          const progressData = {
            loaded: resp.loaded,
            total: resp.total
          };
          observer.next(progressData);
        } else if (HttpEventType.Response === resp.type) {
          // Full response received
          if (resp.body) {
            this.bodyCode(resp, observer);
          } else {
            observer.next(resp.body);
          }
        }
      }, error => {
        console.error(error);
        if (error.status === 401) {
          this.authService.logout();
        } else {
          observer.error(error);
        }
      },
        () => observer.complete());
    });
    return dataObservable.pipe(share());
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


  public advancedQuery(_kv?: Object, _av?: Array<string>, entity?: string, _sqltypes?: Object, offset?: number, _pagesize?: number, _orderby?: Array<Object>): Observable<any> {
    offset = (Util.isDefined(offset)) ? offset : this.offset;

    // Calculate page
    let page = 0;
    if (Util.isDefined(offset)) {
      page = Math.trunc(offset / 10) + 1;
    }

    let url = this.urlBase + '/reportstore/' + entity + '/?format=json' + '&page=' + page;

    return this.doRequest({
      method: 'GET',
      url: url
    });
  }

  public query(kv?: Object, _av?: Array<string>, entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv['UUID'];
    let url = '';
    if (Object.keys(kv).length === 0) {
      url = `${this.urlBase}/reportstore/${entity}`;
    } else {
      url = `${this.urlBase}/reportstore/${entity}/` + identifier;
    }

    return this.doRequest({
      method: 'GET',
      url: url
    });
  }

  public fillReport(av?: Array<string>, entity?: string, _sqltypes?: Object, filter?: Object): Observable<any> {
    const identifier = av[0];
    let params = '';

    for (let i = 1; i < av.length; i++)
      params = params + av[i].toString() + ',';
    let body = JSON.stringify({
      params: params,
      filter: filter
    })

    let url = `${this.urlBase}/reportstore/${entity}/` + identifier;

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  public delete(kv?: Object, _entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = `${this.urlBase}/reportstore/removeReport/` + identifier;

    return this.doRequest({
      method: 'DELETE',
      url: url
    });
  }

  public update(kv?: Object, av?: Array<string>, _entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = `${this.urlBase}/reportstore/updateReport/` + identifier;

    return this.doRequest({
      method: 'PUT',
      url: url,
      body: av
    });
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
