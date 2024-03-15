import { Component, ViewChild } from '@angular/core';
import { OTableComponent } from 'ontimize-web-ngx';
import { OAlertService } from '../../../services/o-alert.service';
import { OReportStoreService } from '../../../services';

@Component({
  selector: 'o-report-home',
  templateUrl: './o-report-home.component.html',
  providers: [
    { provide: 'reportstore', useValue: OReportStoreService}
  ]
})
export class OReportHomeComponent {

  @ViewChild('table', { static: true })
  table: OTableComponent;

  constructor(private alertService: OAlertService) {
    alertService.alert$.subscribe(
      _res => {
        this.table.refresh();
      });
  }

}
