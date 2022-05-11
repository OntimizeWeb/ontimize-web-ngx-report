import { Component, OnInit, ViewChild } from '@angular/core';
import { OTableComponent } from 'ontimize-web-ngx';
import { OAlertService } from '../o-alert.service';

@Component({
  selector: 'o-report-home',
  templateUrl: './o-report-home.component.html',
  styleUrls: ['./o-report-home.component.scss']
})
export class OReportHomeComponent implements OnInit {

  @ViewChild('table', { static: true })
  table: OTableComponent;

  constructor(private alertService: OAlertService) {
    alertService.alert$.subscribe(
      res => {
        this.table.refresh();
      });
   }

  ngOnInit() {
  }

}
