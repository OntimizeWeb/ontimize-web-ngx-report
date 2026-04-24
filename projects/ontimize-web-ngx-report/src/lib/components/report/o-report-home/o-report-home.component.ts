import { Component, inject, Injector, ViewChild } from '@angular/core';
import { OTableComponent, OConfigureServiceArgs, AppConfig, OntimizeWebModule } from 'ontimize-web-ngx';
import { OAlertService } from '../../../services/o-alert.service';
import { OReportStoreService } from '../../../services';

@Component({
  selector: 'o-report-home',
  templateUrl: './o-report-home.component.html',
  standalone: true,
  imports: [OntimizeWebModule],
})
export class OReportHomeComponent {

  @ViewChild('table', { static: true })
  table: OTableComponent;

  private alertService = inject(OAlertService);
  protected injector = inject(Injector);
  appConfig = inject(AppConfig);

  constructor() {
    this.alertService.alert$.subscribe(
      _res => {
        this.table.refresh();
      });
  }

  configureServiceReportStore(): OConfigureServiceArgs {
    let configureArgs: OConfigureServiceArgs;
    configureArgs = {
      injector: this.injector, baseService: OReportStoreService, entity: this.table.entity, service: this.table.service, serviceType: null
    };

    return configureArgs;
  }
}
