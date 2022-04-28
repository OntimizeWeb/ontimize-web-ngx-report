import { Injectable, Injector } from "@angular/core";
import { Observable, OntimizeEEService } from 'ontimize-web-ngx';

@Injectable()
export class ReportsService extends OntimizeEEService {

  constructor(protected injector: Injector) {
    super(injector);
  }



  public createReport(reportparams?: object): Observable<any> {
    let params = reportparams;

    let body = JSON.stringify(
      reportparams
    )
    let url = this.urlBase + '/dynamicjasper/report';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }
  public saveAsPreferences(preferencesparams?: object): Observable<any> {
    let params = preferencesparams;

    let body = JSON.stringify(
      preferencesparams
    )
    let url = this.urlBase + '/preferences/save';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }
  public savePreferences(id: number, preferencesparams?: object): Observable<any> {
    let params = preferencesparams;

    let body = JSON.stringify(
      preferencesparams
    )
    let url = this.urlBase + '/preferences/update/' + id;

    return this.doRequest({
      method: 'PUT',
      url: url,
      body: body
    });
  }
  public getPreferences(): Observable<any> {

    let url = this.urlBase + '/preferences/preferences';

    return this.doRequest({
      method: 'GET',
      url: url
    });

  }
  public getFunctions(functionparams?: object): Observable<any> {
    let params = functionparams;

    let body = JSON.stringify(
      functionparams
    )
    let url = this.urlBase + '/dynamicjasper/functionsName';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  public deletePreferences(id?: number): Observable<any> {

    let url = this.urlBase + '/preferences/remove/' + id;

    return this.doRequest({
      method: 'DELETE',
      url: url
    });
  }


}
