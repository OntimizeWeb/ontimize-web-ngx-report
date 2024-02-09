import { InjectionToken, Injector } from '@angular/core';
import { _getInjectionTokenValue, O_REPORT_SERVICE, Util } from 'ontimize-web-ngx';

import { IReportDataProvider } from '../interfaces/report-data-provider.interface';
import { OAlertService } from '../services/o-alert.service';
import { OReportStoreService } from '../services/o-report-store.service';
import { OReportService } from '../services/o-report.service';
import { O_REPORT_DATA_SERVICE } from '../services/ontimize-report-data-base-provider.service';
import { OntimizeReportDataProvider } from '../services/ontimize-report-data-provider.service';
import { OntimizeReportService } from '../services/ontimize-report.service';


export function reportDataFactory(injector: Injector): IReportDataProvider {
  const provider = _getInjectionTokenValue(O_REPORT_DATA_SERVICE, injector);
  const service = Util.createServiceInstance(provider, injector);
  if (Util.isDefined(service)) {
    return service;
  } else {
    return new OntimizeReportDataProvider(injector);
  }

}
export const OREPORT_PROVIDERS: any = [
  { provide: O_REPORT_SERVICE, useClass: OntimizeReportService },
  {
    provide: 'report',
    useValue: OReportService
  },
  {
    provide: 'reportstore',
    useValue: OReportStoreService
  },
  {
    provide: OntimizeReportDataProvider,
    useFactory: reportDataFactory,
    deps: [Injector]
  },
  OAlertService
];
