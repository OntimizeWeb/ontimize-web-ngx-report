import { Component, Injector, ViewChild } from '@angular/core';
import { OTableComponent, OConfigureServiceArgs, AppConfig } from 'ontimize-web-ngx';
import { OAlertService } from '../../../services/o-alert.service';
import { OReportStoreService } from '../../../services';

@Component({
  selector: 'o-report-home',
  templateUrl: './o-report-home.component.html',
})
export class OReportHomeComponent {

  @ViewChild('table', { static: true })
  table: OTableComponent;
  appConfig: AppConfig;

  constructor(private alertService: OAlertService,
    protected injector: Injector) {
    alertService.alert$.subscribe(
      _res => {
        this.table.refresh();
      });
    this.appConfig = this.injector.get(AppConfig);
  }

  configureServiceReportStore(): OConfigureServiceArgs {
    let configureArgs: OConfigureServiceArgs;
    // if (this.appConfig.getConfiguration().serviceType?.indexOf('Ontimize') > -1) {
    //   configureArgs = { injector: this.injector, baseService: OReportStoreService, entity: 'report', service: 'reportstore', serviceType: null }
    // } else {
      configureArgs = { injector: this.injector, baseService: OReportStoreService, entity: 'report', service: 'reportstore', serviceType: null }
    // }
    return configureArgs;
  }
}
