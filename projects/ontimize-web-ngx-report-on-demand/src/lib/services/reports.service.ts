import { Injectable, Injector } from "@angular/core";
import { Observable, OntimizeEEService, Util } from 'ontimize-web-ngx';

@Injectable()
export class CustomersService extends OntimizeEEService {

  constructor(protected injector: Injector) {
    super(injector);
  }



  public createReport(reportparams?: object): Observable<any> {
    let params = reportparams;

    let body = JSON.stringify(
      reportparams
    )
    let url = 'http://localhost:8080/qsallcomponents-jee/dynamicjasper/report';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }
  public savePreferences(preferencesparams?: object): Observable<any> {
    let params = preferencesparams;

    let body = JSON.stringify(
      preferencesparams
    )
    let url = 'http://localhost:8080/qsallcomponents-jee/preferences/save';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }
  public getPreferences(): Observable<any> {

    let url = 'http://localhost:8080/qsallcomponents-jee/preferences/preferences';

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
    let url = 'http://localhost:8080/qsallcomponents-jee/dynamicjasper/functionsName';

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

}
