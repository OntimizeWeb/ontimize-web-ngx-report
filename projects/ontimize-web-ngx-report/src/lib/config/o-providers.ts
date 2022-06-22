import { Injector } from "@angular/core";
import { O_REPORT_ON_DEMAND_SERVICE } from "ontimize-web-ngx";
import { OAlertService } from "../services/o-alert.service";
import { OFillReportService } from "../services/o-fill-report.service";
import { OReportService } from "../services/o-report.service";
import { OReportOnDemandService } from "../services/reports-on-demand.service";

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