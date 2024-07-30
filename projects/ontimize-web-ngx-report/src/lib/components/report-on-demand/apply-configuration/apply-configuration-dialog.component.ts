import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, Injector, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { DialogService, OntimizePreferencesService, preferencesServiceFactory, Util } from 'ontimize-web-ngx';
import { OReportConfiguration } from '../../../types/report-configuration.type';
import { Subscription } from 'rxjs';


@Component({
  selector: 'apply-configuration-dialog',
  templateUrl: './apply-configuration-dialog.component.html',
  providers: [
    { provide: OntimizePreferencesService, useFactory: preferencesServiceFactory, deps: [Injector] }
  ],
})

export class ApplyConfigurationDialogComponent implements OnInit, OnDestroy {
  @ViewChild(MatSelectionList, { static: true })
  protected configurationList: MatSelectionList;

  public configurationListData: OReportConfiguration[] = [];
  public selectedConfiguration: OReportConfiguration;
  private dialogService: DialogService;
  private preferenceService: OntimizePreferencesService;
  protected preferencesSubscription: Subscription = new Subscription();

  constructor(
    public dialogo: MatDialogRef<ApplyConfigurationDialogComponent>,
    protected injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.dialogService = this.injector.get(DialogService);
    this.preferenceService = this.injector.get(OntimizePreferencesService);
    this.preferenceService.configureService(this.preferenceService.getDefaultServiceConfiguration('preferences'));
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
        this.preferencesSubscription.add(this.preferenceService.deletePreferences(this.selectedConfiguration.PREFERENCEID).subscribe(res => {
          if (res && res.code === 0) {
            this.getConfigurations();
          }
        }));
      }
    });
  }
  onClickConfigurationList(option) {
    this.selectedConfiguration = option;
  }

  getConfigurations() {
    this.preferencesSubscription.add(this.preferenceService.getPreferences(this.data.entity, this.data.service, 'REPORT').subscribe(resp => {
      if (resp.isSuccessful()) {
        this.setDataArray(resp.data);
      }
    }));
  }

  setDataArray(data: any) {
    if (Util.isArray(data)) {
      this.configurationListData = data;
    } else {
      this.configurationListData = []
    }
  }

  ngOnDestroy(): void {
    if (this.preferencesSubscription) {
      this.preferencesSubscription.unsubscribe();
    }

  }
}
