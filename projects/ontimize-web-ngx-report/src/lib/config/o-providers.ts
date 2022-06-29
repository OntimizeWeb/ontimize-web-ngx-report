import { Injector } from "@angular/core";
import { O_REPORT_SERVICE } from "ontimize-web-ngx";
import { OAlertService } from "../services/o-alert.service";
import { OReportService } from "../services/o-report.service";
import { OReportOnDemandService } from "../services/reports-on-demand.service";

export function reportServiceFactory(injector: Injector): OReportService {
  return new OReportService(injector);
}
// export const OREPORT_PROVIDERS: any = [{ provide: O_REPORT_SERVICE, useFactory: reportOnDemandFactory, deps: [Injector, OReportService] },
// {
//   provide: OReportService,
//   useFactory: reportServiceFactory,
//   deps: [Injector]
// },
//   OAlertService
// ];
export const OREPORT_PROVIDERS: any = [{ provide: O_REPORT_SERVICE, useClass: OReportOnDemandService },
{
  provide: 'report',
  useFactory: reportServiceFactory,
  deps: [Injector]
},
  OAlertService
];