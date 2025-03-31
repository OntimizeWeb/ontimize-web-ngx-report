import { Injectable, Injector } from '@angular/core';
import { JSONAPIService, Observable, OErrorDialogManager } from 'ontimize-web-ngx';

import { OReportParam } from '../types/report-param.type';


@Injectable()
export class JSONAPIReportService extends JSONAPIService {
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
    const url = `${this.urlBase}${this.path}/dynamicjasper/report`;

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  public getFunctions(functionparams?: object): Observable<any> {

    const body = JSON.stringify(
      functionparams
    )
    const url = `${this.urlBase}${this.path}/dynamicjasper/functionsName`;

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }


}
