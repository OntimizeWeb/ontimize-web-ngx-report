import { Injector } from "@angular/core";
import { O_REPORT_ON_DEMAND_SERVICE } from "ontimize-web-ngx";
import { OReportService, OReportOnDemandService, OAlertService, OFillReportService } from "../services";

export function reportServiceFactory(injector: Injector): OReportService {
  return new OReportService(injector);
}
export const OREPORT_PROVIDERS: any = [{ provide: O_REPORT_ON_DEMAND_SERVICE, useClass: OReportOnDemandService },
{
  provide: 'report',
  useFactory: reportServiceFactory,
  deps: [Injector]
},
  OAlertService, OFillReportService
];