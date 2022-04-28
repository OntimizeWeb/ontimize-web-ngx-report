import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'ontimize-web-ngx';

import { ReportsService } from '../../services/reports.service';
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
  encapsulation: ViewEncapsulation.None,
  providers: [ReportsService]
})

export class ReportOnDemandComponent implements OnInit {

  @ViewChild('title', { static: true })
  title: string;
  @ViewChild('subtitle', { static: true })
  subtitle: string;
  @ViewChild('name', { static: true })
  name: string = '';

  public pdf: string = '';
  public selectedOrientation = "vertical";
  public orientations = ["vertical", "horizontal"];
  public functionsData = [
    { value: 'max', viewValue: 'Máximo' }, { value: 'min', viewValue: 'Mínimo' },
    { value: 'sum', viewValue: 'Suma' }, { value: 'med', viewValue: 'Media' }
  ];
  public columnsData: any;
  public columnsToGroupData: any;
  public selectedPreferences;
  public opened: boolean = true;

  public selectedOptions = [];
  public selectedGroups = [];
  public selectedFunctions = [];
  public selectedStyleFunctions = [];
  public dataArray: { value: string; viewValue: string; }[];

  public columnStyleData = [];

  description: String = "";
  public fullscreen: boolean = false;

  protected entity: string;
  protected service: string;




  constructor(private reportsService: ReportsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReportOnDemandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, protected dialogService: DialogService) {
    this.selectedStyleFunctions = [];
    this.entity = this.data.entity;
    this.service = this.data.service;
  }


  public previewReport(): void {
    this.openReport();
  }

  ngOnInit() {
    this.initialize();
  }

  protected initialize() {
    this.columnsData = this.data.columns.split(";");
    this.columnsToGroupData = this.data.columns.split(";");
    this.getFunctions();
    this.dataArray = [{ value: 'grid', viewValue: 'GRID' }, { value: 'rowNumber', viewValue: 'ROW_NUMBER' },
    { value: 'columnName', viewValue: 'COLUMNS_NAMES' }, { value: 'hideGroupDetails', viewValue: 'GROUP_DETAILS' }, { value: 'groupNewPage', viewValue: 'GROUP_PAGE' },
    { value: 'firstGroupNewPage', viewValue: 'FIRST_GROUP_PAGE' }];


  }

  protected openReport() {
    console.log(this.entity);
    console.log(this.service);
    this.reportsService.configureService(this.reportsService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.reportsService.configureAdapter();
    this.reportsService.createReport({
      "title": this.title, "columns": this.selectedOptions, "groups": this.selectedGroups, "entity": this.entity,
      "service": "Customer", "orientation": this.selectedOrientation, "functions": this.selectedFunctions, "styleFunctions": this.selectedStyleFunctions, "subtitle": this.subtitle, "columnStyle": this.columnStyleData
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.pdf = res.data[0].file;
      }
    });
  }

  saveAsPreferences() {
    let vertical = 0;
    if (this.selectedOrientation == "vertical") { vertical = 1 };
    this.reportsService.configureService(this.reportsService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.reportsService.configureAdapter();
    this.reportsService.saveAsPreferences({
      "entity": this.entity, "title": this.title, "columns": this.selectedOptions, "groups": this.selectedGroups,
      "vertical": vertical, "name": this.name, "functions": this.selectedFunctions, "styleFunctions": this.selectedStyleFunctions, "subtitle": this.subtitle, "description": this.description
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
      }
    });

  }

  getFunctions() {
    this.reportsService.configureService(this.reportsService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.reportsService.configureAdapter();
    this.reportsService.getFunctions({
      "columns": this.data.columns.split(";"), "entity": this.entity,
      "service": "Customer", "language": "es"
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.functionsData = res.data[0].list;
      }
    });
  }

  changePreferences() {
    this.selectedOptions = this.selectedPreferences.columns.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
    if (this.selectedPreferences.groups != []) {
      this.selectedGroups = this.selectedPreferences.groups.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
    } if (this.selectedPreferences.functions != []) {
      this.selectedFunctions = this.selectedPreferences.functions.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
    } if (this.selectedPreferences.styleFunctions != []) {
      this.selectedStyleFunctions = this.selectedPreferences.stylefunctions.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
    } this.reportsService.configureService(this.reportsService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.reportsService.configureAdapter();
    var reportOrientation;
    if (this.selectedPreferences.vertical) {
      reportOrientation = "vertical";
    }
    else {
      reportOrientation = "horizontal";
    }
    this.reportsService.createReport({
      "title": this.selectedPreferences.title, "columns": this.selectedOptions, "groups": this.selectedGroups, "entity": "customer",
      "service": "Customer", "orientation": reportOrientation, "functions": this.selectedFunctions, "styleFunctions": this.selectedStyleFunctions, "subtitle": this.selectedPreferences.subtitle
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.pdf = res.data[0].file;
      }
    });
  }

  mostrarDialogo(id): void {
    this.dialog
      .open(StyleDialogComponent, {
        data: id,
        panelClass: ['o-dialog-class', 'o-table-dialog']
      })
      .afterClosed()
      .subscribe((data: {}) => {
        this.columnStyleData.push(data);
      });
  }

  selectFunction(functionName: String): void {
    if (functionName != 'TOTAL') {
      this.dialog
        .open(SelectFunctionDialogComponent, {
          data: functionName,
          panelClass: ['o-dialog-class', 'o-table-dialog']
        })
        .afterClosed()
        .subscribe((data: String) => {
          this.selectedFunctions.push(data)
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
        this.name = data.name;
        this.description = data.description;
        this.saveAsPreferences();
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
      data: this.entity
    }).afterClosed()
      .subscribe((data: {}) => {
        this.selectedPreferences = data;
        this.changePreferences();
      });
  }
  openSavePreferences(): void {
    this.dialog
      .open(SavePreferencesDialogComponent, {
        panelClass: ['o-dialog-class', 'o-table-dialog']
      })
      .afterClosed()
      .subscribe((data: { name: string, description: string }) => {
        this.name = data.name;
        this.description = data.description;
        this.savePreferences();
      });

  }

  savePreferences() {
    let vertical = 0;
    if (this.selectedOrientation == "vertical") { vertical = 1 }
    this.reportsService.configureService(this.reportsService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.reportsService.configureAdapter();
    this.reportsService.savePreferences(this.selectedPreferences.ID, {
      "entity": this.entity, "title": this.title, "columns": this.selectedOptions, "groups": this.selectedGroups,
      "vertical": vertical, "name": this.name, "functions": this.selectedFunctions, "styleFunctions": this.selectedStyleFunctions, "subtitle": this.subtitle, "description": this.description
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
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

}