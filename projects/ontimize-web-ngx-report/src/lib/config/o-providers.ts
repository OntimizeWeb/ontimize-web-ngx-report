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

/**
 * Creates a new instance of the report on demand service.
 */
export function getReportOnDemandServiceProvider(injector: Injector): OReportService {
  // TODO modificar core para tener el Injection Token (Ojo, ya existe un O_REPORT_SERVICE para el servicio de abrir)
  // const serviceClass = _getInjectionTokenValue(O_REPORT_SERVICE, injector);
  // const service = Util.createServiceInstance(serviceClass, injector);
  // return Util.isDefined(service) ? service : new OReportService(injector);
  return new OReportService(injector);
}

/**
 * Creates a new instance of the report store service.
 */
export function getReportStoreServiceProvider(injector: Injector): OReportStoreService {
  // TODO modificar core para tener el Injection Token
  // const serviceClass = _getInjectionTokenValue(O_REPORT_STORE_SERVICE, injector);
  // const service = Util.createServiceInstance(serviceClass, injector);
  // return Util.isDefined(service) ? service : new OReportStoreService(injector);
  return new OReportStoreService(injector);
}

export const OREPORT_PROVIDERS: any = [
  { provide: O_REPORT_SERVICE, useClass: OntimizeReportService },
  { provide: OReportService, useFactory: getReportOnDemandServiceProvider, deps: [Injector] },
  { provide: OReportStoreService, useFactory: getReportStoreServiceProvider, deps: [Injector] },
  {
    provide: OntimizeReportDataProvider,
    useFactory: reportDataFactory,
    deps: [Injector]
  },
  OAlertService
];
