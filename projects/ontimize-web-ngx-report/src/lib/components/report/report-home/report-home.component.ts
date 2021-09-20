import { Component, OnInit, ViewChild } from '@angular/core';
import { OTableComponent } from 'ontimize-web-ngx';
import { AlertService } from '../alert.service';

@Component({
  selector: 'o-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {

  @ViewChild('table', { static: true })
  table: OTableComponent;

  constructor(private alertService: AlertService) {
    alertService.alert$.subscribe(
      res => {
        this.table.refresh();
      });
   }

  ngOnInit() {
  }

}
