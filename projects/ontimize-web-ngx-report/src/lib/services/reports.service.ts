import { Injectable, Injector } from "@angular/core";
import { Observable, OntimizeEEService } from 'ontimize-web-ngx';

@Injectable({ providedIn: 'root' })
export class ReportsService extends OntimizeEEService {

  constructor(protected injector: Injector) {
    super(injector);
    super.configureService(this.getDefaultServiceConfiguration());
  }

  public createReport(reportparams?: object): Observable<any> {

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


}
