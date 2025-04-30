import { Injectable, Injector } from '@angular/core';
import { Observable, OErrorDialogManager, OntimizeEEService } from 'ontimize-web-ngx';

import { OReportParam } from '../types/report-param.type';
import { OReportResponseAdapter } from './o-report-response.adapter';
import { OReportRequestArgumentsAdapter } from './o-report-request-argument.adapter';


@Injectable()
export class OReportService extends OntimizeEEService {
  protected oErrorDialogManager: OErrorDialogManager;

  constructor(protected injector: Injector) {
    super(injector);
    super.configureService(this.getDefaultServiceConfiguration('report'));
    this.oErrorDialogManager = injector.get<OErrorDialogManager>(OErrorDialogManager);
    this.requestArgumentAdapter = this.injector.get(OReportRequestArgumentsAdapter);
  }

  public configureAdapter() {
    this.adapter = this.injector.get(OReportResponseAdapter);
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



}
