import { ViewChild } from '@angular/core';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService, OTextInputComponent } from 'ontimize-web-ngx';
import { CustomersService } from '../../services/reports.service';
import { SavePreferencesDialogComponent } from '../save-preferences-dialog/save-preferences-dialog.component';
import { SelectFunctionDialogComponent } from '../select-function-dialog/select-function-dialog.component';

import { StyleDialogComponent } from '../style-dialog/style-dialog.component';

@Component({
  selector: 'app-customers-dialog',
  templateUrl: './report-on-demand.component.html',
  styleUrls: ['./report-on-demand.component.css'],
  providers: [CustomersService]
})

export class ReportOnDemandComponent implements OnInit {
  showInput: Boolean = false;
  @ViewChild('title', { static: true })
  title: OTextInputComponent;
  @ViewChild('subtitle', { static: true })
  subtitle: OTextInputComponent;
  @ViewChild('name', { static: true })
  name;
  public pdf = '';
  selectedOptions = [];
  selectedGroups = [];
  selectedFunctions = [];
  selectedStyleFunctions = [];
  ordersData = this.data.columns.split(";");
  ordersData2 = this.data.columns.split(";");
  orientation = ["vertical", "horizontal"];
  obj;
  indice;
  proVal;
  proTex;
  selectedOrientation: String = "vertical";
  ordersDataFunctions = this.getFunctions();
  dataArray = [{ value: 'grid', viewValue: 'Dibujar rejilla' }, { value: 'rowNumber', viewValue: 'Números de fila' },
  { value: 'columnName', viewValue: 'Nombres de columnas' }, { value: 'hideGroupDetails', viewValue: 'Ocultar detalles grupo' }, { value: 'groupNewPage', viewValue: 'Grupo en página' },
  { value: 'firstGroupNewPage', viewValue: 'Primer grupo en página' }];
  dataFunctions = [{ value: 'max', viewValue: 'Máximo' }, { value: 'min', viewValue: 'Mínimo' },
  { value: 'sum', viewValue: 'Suma' }, { value: 'med', viewValue: 'Media' }];
  ordersDataPreferences = this.getPreferences();
  columnStyleData = [];
  entity;
  service;
  constructor(private customersService: CustomersService, public dialogo2: MatDialog, public dialogo3: MatDialog,
    public dialogo: MatDialogRef<ReportOnDemandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, protected dialogService: DialogService) {
    this.selectedStyleFunctions = [];
    this.entity = this.data.entity;
    this.service = this.data.service;
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.openReport();
    //this.dialogo.close(true);
  }

  ngOnInit() {
  }
  public openReport() {
    console.log(this.entity);
    console.log(this.service);
    this.customersService.configureService(this.customersService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.customersService.configureAdapter();
    this.customersService.createReport({
      "title": this.title, "columns": this.selectedOptions, "groups": this.selectedGroups, "entity": "customer",
      "service": "Customer", "orientation": this.selectedOrientation, "functions": this.selectedFunctions, "styleFunctions": this.selectedStyleFunctions, "subtitle": this.subtitle, "columnStyle": this.columnStyleData
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.pdf = res.data[0].file;
      }
    });
  }
  onAreaListControlChanged(list) {
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
  }
  onAreaListControlChanged2(list) {
    this.selectedGroups = list.selectedOptions.selected.map(item => item.value);
  }
  onAreaListControlChangedFunctions(list) {
    this.selectedFunctions = list.selectedOptions.selected.map(item => item.value);
  }
  onAreaOrientationControlChanged(list) {
    this.selectedOrientation = list;
  }
  onAreaSettingsListControlChanged(list) {
    this.selectedStyleFunctions = list.selectedOptions.selected.map(item => item.value);
  }
  savePreferences() {
    var vertical;
    if (this.selectedOrientation == "vertical") { vertical = 1 }
    else { vertical = 0 }
    this.showInput = false;
    this.customersService.configureService(this.customersService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.customersService.configureAdapter();
    this.customersService.savePreferences({
      "title": this.title, "columns": this.selectedOptions, "groups": this.selectedGroups,
      "vertical": vertical, "name": this.name, "functions": this.selectedFunctions, "styleFunctions": this.selectedStyleFunctions, "subtitle": this.subtitle
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
      }
    });
    this.dialogo.componentInstance.getPreferences();
    this.ordersDataPreferences = this.getPreferences();
  }
  getPreferences() {

    this.customersService.configureService(this.customersService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.customersService.configureAdapter();
    this.customersService.getPreferences().subscribe(res => {
      this.ordersDataPreferences = res.data;
      return res.data
    });
  }
  getFunctions() {

    this.customersService.configureService(this.customersService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.customersService.configureAdapter();
    this.customersService.getFunctions({
      "columns": this.data.columns.split(";"), "entity": "customer",
      "service": "Customer"
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.ordersDataFunctions = res.data[0].list;
      }
    });
  }

  changePreferences(event) {
    this.selectedOptions = event.COLUMNS.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
    this.selectedGroups = event.GROUPS.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
    this.selectedFunctions = event.FUNCTIONS.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
    this.selectedStyleFunctions = event.STYLEFUNCTIONS.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
    this.customersService.configureService(this.customersService.getDefaultServiceConfiguration('bankmanager-jee'));
    this.customersService.configureAdapter();
    var reportOrientation;
    if (event.ORIENTATION) {
      reportOrientation = "vertical";
    }
    else {
      reportOrientation = "horizontal";
    }
    this.customersService.createReport({
      "title": event.TITLE, "columns": this.selectedOptions, "groups": this.selectedGroups, "entity": "customer",
      "service": "Customer", "orientation": reportOrientation, "functions": this.selectedFunctions, "styleFunctions": this.selectedStyleFunctions, "subtitle": event.SUBTITLE
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.pdf = res.data[0].file;
      }
    });
  }
  changeStyle(event: []) {
    this.selectedStyleFunctions = [];
    event.forEach(element => {
      this.selectedStyleFunctions.push(element);

    });
  }

  mostrarDialogo(id): void {
    this.dialogo2
      .open(StyleDialogComponent, {
        data: id
      })
      .afterClosed()
      .subscribe((data: {}) => {
        this.columnStyleData.push(data);
      });
  }
  sortColumns(): void {
    /* this.dialogo3
       .open(SortColumnsDialogComponent, {
         data: this.selectedOptions
       })
       .afterClosed()
       .subscribe((data: []) => {
         this.selectedOptions = data;
       });*/
  }
  sortGroups(): void {
    /*this.dialogo3
      .open(SortColumnsDialogComponent, {
        data: this.selectedGroups
      })
      .afterClosed()
      .subscribe((data: []) => {
        this.selectedGroups = data;
      });*/
  }
  selectFunction(functionName: String): void {
    if (functionName != 'TOTAL') {
      this.dialogo3
        .open(SelectFunctionDialogComponent, {
          data: functionName
        })
        .afterClosed()
        .subscribe((data: String) => {
          this.selectedFunctions.push(data)
        });
    }
  }
  openSavePreferences(): void {
    this.dialogo3
      .open(SavePreferencesDialogComponent, {
      })
      .afterClosed()
      .subscribe((data: String) => {
        this.name = data;
        this.savePreferences();
      });

  }
  resize() {
    this.dialogo.updateSize('1600px', '1000px');
  }
}
