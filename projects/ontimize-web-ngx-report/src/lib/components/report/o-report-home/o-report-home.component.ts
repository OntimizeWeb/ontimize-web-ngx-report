import { Component, inject, Injector, ViewChild } from "@angular/core";
import {
  AppConfig,
  OConfigureServiceArgs,
  OntimizeWebModule,
  OTableComponent,
} from "ontimize-web-ngx";
import { OReportStoreService } from "../../../services";
import { OAlertService } from "../../../services/o-alert.service";

@Component({
  selector: "o-report-home",
  templateUrl: "./o-report-home.component.html",
  standalone: true,
  imports: [OntimizeWebModule],
})
export class OReportHomeComponent {
  @ViewChild("table", { static: true })
  table: OTableComponent;

  protected injector = inject(Injector);
  appConfig = inject(AppConfig);
  private readonly alertService = inject(OAlertService);

  constructor() {
    this.alertService.alert$.subscribe((_res) => {
      this.table.refresh();
    });
  }

  configureServiceReportStore(): OConfigureServiceArgs {
    let configureArgs: OConfigureServiceArgs;
    configureArgs = {
      injector: this.injector,
      baseService: OReportStoreService,
      entity: this.table.entity,
      service: this.table.service,
      serviceType: null,
    };

    return configureArgs;
  }
}
