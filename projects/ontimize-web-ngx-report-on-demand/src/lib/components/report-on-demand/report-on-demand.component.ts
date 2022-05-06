import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService, OTranslateService, Util } from 'ontimize-web-ngx';

import { ReportsService } from '../../services/reports.service';
import { OReportColumnsStyle } from '../../types/report-column-style.type';
import { OReportConfiguration } from '../../types/report-configuration.type';
import { OReportPreferences } from '../../types/report-preferences.type';
import { ApplyConfigurationDialogComponent } from '../apply-configuration/apply-configuration-dialog.component';
import { SavePreferencesDialogComponent } from '../save-preferences-dialog/save-preferences-dialog.component';
import { SelectFunctionDialogComponent } from '../select-function-dialog/select-function-dialog.component';

import { StyleDialogComponent } from '../style-dialog/style-dialog.component';

export const DEFAULT_WIDTH_DIALOG = '70%';
export const DEFAULT_HEIGHT_DIALOG = '90%';

@Component({
  selector: 'app-customers-dialog',
  templateUrl: './report-on-demand.component.html',
  styleUrls: ['./report-on-demand.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ReportOnDemandComponent implements OnInit {

  @ViewChild('columnsList', { static: true }) columnsList: MatSelectionList;
  public pdf: string = '';
  public orientations = [{ text: "vertical", value: true }, { text: "horizontal", value: false }];
  public functionsData = [];
  public dataArray = [
    { value: 'grid', viewValue: 'GRID' },
    { value: 'rowNumber', viewValue: 'ROW_NUMBER' },
    { value: 'columnName', viewValue: 'COLUMNS_NAMES' },
    { value: 'hideGroupDetails', viewValue: 'GROUP_DETAILS' },
    { value: 'groupNewPage', viewValue: 'GROUP_PAGE' },
    { value: 'firstGroupNewPage', viewValue: 'FIRST_GROUP_PAGE' }
  ];

  public columnsData: any;
  public columnsToGroupData: any;
  public opened: boolean = true;
  public fullscreen: boolean = false;

  protected service: string;

  public currentPreference: OReportPreferences;
  public currentConfiguration: OReportConfiguration;


  constructor(private reportsService: ReportsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReportOnDemandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogService: DialogService,
    public translateService: OTranslateService) {
  }

  ngOnInit() {
    this.initialize();
  }

  public previewReport(): void {
    this.openReport();
  }

  protected initialize() {
    this.service = this.data.service;
    const columnsData = this.data.columns.split(';');
    this.columnsData = this.parseColumnsStyle(columnsData);
    this.columnsToGroupData = columnsData;
    this.currentPreference = { title: '', subtitle: '', vertical: true, columns: [], groups: [], functions: [], styleFunctions: [], columnsStyle: [] };
    this.currentConfiguration = { ENTITY: this.data.entity }

    this.getFunctions();
  }

  protected parseColumnsStyle(columns: any[]): OReportColumnsStyle[] {
    return columns.map(column => {
      return { id: column, name: this.translateService.get(column), width: 85, alignment: 'left' }
    });
  }

  protected openReport() {
    let columns = this.currentPreference.columnsStyle.map(x => x.id);
    let orientation = this.currentPreference.vertical ? 'vertical' : 'horizontal';
    this.reportsService.createReport({
      "title": this.currentPreference.title, "columns": columns, "groups": this.currentPreference.groups, "entity": this.currentConfiguration.ENTITY,
      "service": "Customer", "orientation": orientation, "functions": this.currentPreference.functions,
      "styleFunctions": this.currentPreference.styleFunctions, "subtitle": this.currentPreference.subtitle, "columnStyle": this.currentPreference.columnsStyle
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.pdf = res.data[0].file;
      }
    });
  }


  getFunctions() {
    this.reportsService.getFunctions({
      "columns": this.data.columns.split(";"), "entity": this.currentConfiguration.ENTITY,
      "service": "Customer", "language": this.translateService.getCurrentLang()
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.functionsData = res.data[0].list;
      }
    });
  }


  applyConfiguration(configuration: any) {
    this.currentConfiguration = configuration;
    let preference = JSON.parse(this.currentConfiguration.PREFERENCES);
    this.currentPreference = {
      title: preference.title,
      subtitle: preference.subtitle,
      vertical: preference.vertical,
      columns: this.parseStringToArray(preference.columns),
      functions: this.parseStringToArray(preference.functions),
      groups: this.parseStringToArray(preference.groups),
      styleFunctions: this.parseStringToArray(preference.styleFunctions),
      columnsStyle: this.parseColumnsStyle(this.parseStringToArray(preference.columns))
    };

  }

  showColumnStyleDialog(event, id): void {
    event.stopPropagation();
    const columnStyleData: OReportColumnsStyle = this.currentPreference.columnsStyle.find((x: OReportColumnsStyle) => x.id === id);
    this.dialog
      .open(StyleDialogComponent, {
        data: columnStyleData ? columnStyleData : id,
        panelClass: ['o-dialog-class', 'o-table-dialog']
      })
      .afterClosed()
      .subscribe((data: OReportColumnsStyle) => {
        if (Util.isDefined(data) && data) {
          this.updateColumnStylesData(data);
        }
      });
  }

  updateColumnStylesData(data: OReportColumnsStyle) {
    const indexColumnStyleData = this.currentPreference.columnsStyle.findIndex(x => x.id === data.id);
    if (indexColumnStyleData > -1) {
      this.currentPreference.columnsStyle[indexColumnStyleData] = data;
    }
  }

  selectFunction(event, functionName: String): void {
    event.stopPropagation();
    if (functionName != 'TOTAL') {
      this.dialog
        .open(SelectFunctionDialogComponent, {
          data: functionName,
          panelClass: ['o-dialog-class', 'o-table-dialog']
        })
        .afterClosed()
        .subscribe((data: string) => {
          //TODO update functions not allways push data
          this.currentPreference.functions.push(data);
          this.currentPreference.functions.forEach((x, index) => {
            if (x !== 'TOTAL') {
              this.currentPreference.functions[index] = x;
            }

          })
        });
    }
  }

  openSaveAsPreferences(): void {
    this.dialog
      .open(SavePreferencesDialogComponent, {
        panelClass: ['o-dialog-class', 'o-table-dialog']
      })
      .afterClosed()
      .subscribe((data: { name: string, description: string }) => {
        if (Util.isDefined(data) && data) {
          this.saveAsPreferences(data);
        }
      });

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsData, event.previousIndex, event.currentIndex);
  }

  drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToGroupData, event.previousIndex, event.currentIndex)
  }

  public onApplyConfigurationClicked(): void {
    this.dialog.open(ApplyConfigurationDialogComponent, {
      width: 'calc((75em - 100%) * 1000)',
      maxWidth: '65vw',
      minWidth: '30vw',
      disableClose: true,
      panelClass: ['o-dialog-class', 'o-table-dialog'],
      data: this,
    }).afterClosed()
      .subscribe((data: OReportConfiguration) => {
        if (Util.isDefined(data) && data) {
          this.applyConfiguration(data);
        }
      });
  }

  openSavePreferences(): void {
    if (Util.isDefined(this.currentConfiguration.ID)) {
      this.savePreferences({ name: this.currentConfiguration.NAME, description: this.currentConfiguration.NAME });
    } else {
      this.dialog
        .open(SavePreferencesDialogComponent, {
          panelClass: ['o-dialog-class', 'o-table-dialog']
        })
        .afterClosed()
        .subscribe((data: { name: string, description: string }) => {
          if (Util.isDefined(data) && data) {
            this.savePreferences(data);
          }
        });
    }

  }

  savePreferences(data: any) {
    let columns = this.currentPreference.columnsStyle.map(x => x.id);
    let preference = {
      "name": data.name, "description": data.description,
      "entity": this.currentConfiguration.ENTITY, "title": this.currentPreference.title, "columns": columns, "groups": this.currentPreference.groups,
      "vertical": this.currentPreference.vertical, "functions": this.currentPreference.functions, "styleFunctions": this.currentPreference.styleFunctions,
      "subtitle": this.currentPreference.subtitle
    }
    this.reportsService.savePreferences(this.currentConfiguration.ID, preference).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
      }
    });
  }

  saveAsPreferences(data) {
    let columns = this.currentPreference.columnsStyle.map(x => x.id);
    let preference = {
      "name": data.name, "description": data.description,
      "entity": this.currentConfiguration.ENTITY, "title": this.currentPreference.title, "columns": columns, "groups": this.currentPreference.groups,
      "vertical": this.currentPreference.vertical, "functions": this.currentPreference.functions, "styleFunctions": this.currentPreference.styleFunctions,
      "subtitle": this.currentPreference.subtitle
    }
    this.reportsService.saveAsPreferences(preference).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        //this.currentPreference = res.data;
      }
    });

  }


  setFullscreenDialog(): void {
    if (!this.fullscreen) {
      this.dialogRef.updateSize("100%", "100%");
    } else {
      this.dialogRef.updateSize(DEFAULT_WIDTH_DIALOG, DEFAULT_HEIGHT_DIALOG);
    }
    this.fullscreen = !this.fullscreen;
  }

  onSelectionChangeGroups(event: MatSelectionListChange) {

    let columnSelectedToGroup = event.option.value;
    let columnStyleSelected: OReportColumnsStyle = { id: columnSelectedToGroup, name: this.translateService.get(columnSelectedToGroup), width: 85, alignment: 'left' };
    if (event.option.selected) {
      if (!this.currentPreference.columns.includes(columnSelectedToGroup)) {
        this.currentPreference.columnsStyle.push(columnStyleSelected);
      }
    }
  }

  isCheckedColumn(column) {
    return this.currentPreference.columnsStyle.length > 0 ? this.currentPreference.columnsStyle.filter(x => x.id === column.id).length > 0 : false;
  }


  private parseStringToArray(data): string[] {
    return data.replace("[", "").replace("]", "").split(',');
  }

}