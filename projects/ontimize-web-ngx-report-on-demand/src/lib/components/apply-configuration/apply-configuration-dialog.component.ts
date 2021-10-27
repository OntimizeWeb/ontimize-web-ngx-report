import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Inject, Injector, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatListOption, MatSelectionList } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { ReportsService } from '../../services/reports.service';



@Component({
  selector: 'apply-configuration-dialog',
  templateUrl: './apply-configuration-dialog.component.html',
  styleUrls: ['./apply-configuration-dialog.component.scss'],
  providers: [ReportsService, DialogService]
})
export class ApplyConfigurationDialogComponent implements OnInit {



  @ViewChild(MatSelectionList, { static: true })
  protected configurationList: MatSelectionList;
  ordersDataPreferences = [];
  selectedOption;
  constructor(private dialogService: DialogService, private reportsService: ReportsService, public dialogo: MatDialogRef<ApplyConfigurationDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public entity: String) {
    this.getPreferences();
  }

  ngOnInit() {
  }
  confirmado(): void {
    this.dialogo.close(this.selectedOption);
  }
  remove(): void {
    this.dialogService.confirm('CONFIRM', 'TABLE.DIALOG.CONFIRM_REMOVE_CONFIGURATION').then(result => {
      if (result) {
        this.reportsService.configureService(this.reportsService.getDefaultServiceConfiguration('bankmanager-jee'));
        this.reportsService.configureAdapter();
        this.reportsService.deletePreferences(this.selectedOption.ID).subscribe(res => {
          if (res && res.code === 0) {
            this.getPreferences();
          }
        });
      }
    });
  }
  onAreaListControlChanged(option) {
    this.selectedOption = option;
  }
  getPreferences() {

    this.reportsService.configureService(this.reportsService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.reportsService.configureAdapter();
    this.reportsService.getPreferences().subscribe(res => {
      res.data.forEach(element => {
        if (element.ENTITY == this.entity)
          this.ordersDataPreferences.push(element);
      });
    });
  }
}