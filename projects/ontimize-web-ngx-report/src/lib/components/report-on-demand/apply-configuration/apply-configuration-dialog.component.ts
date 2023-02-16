import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectionList, MatListOption } from '@angular/material';
import { DialogService, Util } from 'ontimize-web-ngx';
import { OReportService } from '../../../services/o-report.service';
import { OReportConfiguration } from '../../../types/report-configuration.type';


@Component({
  selector: 'apply-configuration-dialog',
  templateUrl: './apply-configuration-dialog.component.html'
})

export class ApplyConfigurationDialogComponent implements OnInit {
  @ViewChild(MatSelectionList, { static: true })
  protected configurationList: MatSelectionList;

  public configurationListData: OReportConfiguration[] = [];
  public selectedConfiguration: OReportConfiguration;

  constructor(
    private dialogService: DialogService,
    private reportsService: OReportService,
    public dialogo: MatDialogRef<ApplyConfigurationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getConfigurations();
  }
  ngOnInit(): void {
    this.configurationList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  loadConfiguration(): void {
    this.dialogo.close(this.selectedConfiguration);
  }

  remove(): void {
    this.dialogService.confirm('CONFIRM', 'TABLE.DIALOG.CONFIRM_REMOVE_CONFIGURATION').then(result => {
      if (result) {
        this.reportsService.deletePreferences(this.selectedConfiguration.ID).subscribe(res => {
          if (res && res.code === 0) {
            this.getConfigurations();
          }
        });
      }
    });
  }
  onClickConfigurationList(option) {
    this.selectedConfiguration = option;
  }

  getConfigurations() {
    this.reportsService.getPreferences(this.data.entity, this.data.service).subscribe(resp => {
      if (resp.isSuccessful()) {
        this.setDataArray(resp.data);
      }
    });
  }

  setDataArray(data: any) {
    if (Util.isArray(data)) {
      this.configurationListData = data;
    } else {
      this.configurationListData = []
    }
  }
}