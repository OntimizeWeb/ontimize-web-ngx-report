import { Injector } from "@angular/core";
import { O_REPORT_SERVICE } from "ontimize-web-ngx";
import { OAlertService } from "../services/o-alert.service";
import { OReportService } from "../services/o-report.service";
import { OntimizeReportService } from "../services/ontimize-report.service";

export function reportServiceFactory(injector: Injector): OReportService {
  return new OReportService(injector);
}

export const OREPORT_PROVIDERS: any = [{ provide: O_REPORT_SERVICE, useClass: OntimizeReportService },
{
  provide: 'report',
  useFactory: reportServiceFactory,
  deps: [Injector]
},
  OAlertService
];