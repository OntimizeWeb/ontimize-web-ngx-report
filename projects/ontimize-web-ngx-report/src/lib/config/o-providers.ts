import { ReportTranslateService } from './../services/report-translate.service';
import { Injector } from '@angular/core';
import { _getInjectionTokenValue, AppConfig, FactoryUtil, O_REPORT_SERVICE, Util } from 'ontimize-web-ngx';

import { IReportDataProvider } from '../interfaces/report-data-provider.interface';
import { JSONAPIReportStoreService } from '../services/jsonapi-report-store.service';
import { JSONAPIReportService } from '../services/jsonapi-report.service';
import { OAlertService } from '../services/o-alert.service';
import { OReportRequestArgumentsAdapter } from '../services/o-report-request-argument.adapter';
import { OReportResponseAdapter } from '../services/o-report-response.adapter';
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
export function getReportOnDemandServiceProvider(injector: Injector): OReportService | JSONAPIReportService {
  // TODO modificar core para tener el Injection Token (Ojo, ya existe un O_REPORT_SERVICE para el servicio de abrir)
  // const serviceClass = _getInjectionTokenValue(O_REPORT_SERVICE, injector);
  // const service = Util.createServiceInstance(serviceClass, injector);
  // return Util.isDefined(service) ? service : new OReportService(injector);

  const config = injector.get(AppConfig).getConfiguration();
  if (!Util.isDefined(config.serviceType)) {
    return new OReportService(injector);
  } else if (FactoryUtil.isOntimizeEEService(injector)) {
      return new OReportService(injector);
  } else if (FactoryUtil.isJsonApiService(injector)) {
      return new JSONAPIReportService(injector);
    }

  return new OReportService(injector);
}

/**
 * Creates a new instance of the report store service.
 */
export function getReportStoreServiceProvider(injector: Injector): OReportStoreService | JSONAPIReportStoreService {
  // TODO modificar core para tener el Injection Token
  // const serviceClass = _getInjectionTokenValue(O_REPORT_STORE_SERVICE, injector);
  // const service = Util.createServiceInstance(serviceClass, injector);
  // return Util.isDefined(service) ? service : new OReportStoreService(injector);
  const config = injector.get(AppConfig).getConfiguration();
  if (!Util.isDefined(config.serviceType)) {
    return new OReportStoreService(injector);
  }
  if (FactoryUtil.isOntimizeEEService(injector)) {
    return new OReportStoreService(injector);
  } else if (FactoryUtil.isJsonApiService(injector)) {
    return new JSONAPIReportStoreService(injector);
  }
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
  OAlertService,
  OReportResponseAdapter,
  OReportRequestArgumentsAdapter,
  ReportTranslateService
];
