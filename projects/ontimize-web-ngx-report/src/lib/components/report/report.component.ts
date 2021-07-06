import { Component, OnInit, ViewChild } from '@angular/core';
import { OTableComponent } from 'ontimize-web-ngx';
import { AlertService } from '../report/alert.service';

@Component({
  selector: 'o-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

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
