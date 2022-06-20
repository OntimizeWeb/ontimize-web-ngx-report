import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService, OColumn, OTableComponent, OTranslateService, SnackBarService, Util } from 'ontimize-web-ngx';
import { ReportsService } from '../../../services/reports.service';
import { OReportColumn } from '../../../types/report-column.type';
import { OReportConfiguration } from '../../../types/report-configuration.type';
import { OReportFunction } from '../../../types/report-function.type';
import { OReportOrderBy } from '../../../types/report-orderBy.type';
import { DefaultOReportPreferences, OReportPreferences } from '../../../types/report-preferences.type';
import { OReportServiceRenderer } from '../../../types/report-service-renderer.type';
import { Utils } from '../../../util/utils';
import { ApplyConfigurationDialogComponent } from '../apply-configuration/apply-configuration-dialog.component';
import { SavePreferencesDialogComponent } from '../save-preferences-dialog/save-preferences-dialog.component';
import { SelectFunctionDialogComponent } from '../select-function-dialog/select-function-dialog.component';

import { StyleDialogComponent } from '../style-dialog/style-dialog.component';

@Component({
  selector: 'app-customers-dialog',
  templateUrl: './report-on-demand.component.html',
  styleUrls: ['./report-on-demand.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ReportOnDemandComponent implements OnInit {

  @ViewChild('columnsList', { static: false }) columnsList: MatSelectionList;
  @ViewChild('functionsList', { static: false }) functionsList: MatSelectionList;
  @ViewChild('orderByList', { static: false }) orderByList: MatSelectionList;

  public orientations = [{ text: "vertical", value: true }, { text: "horizontal", value: false }];
  public functionsData: OReportFunction[] = [];
  private initialFunctionsData: OReportFunction[] = []; // when clear
  public appliedConfiguration: boolean = false;
  public selectedFunctions = [];

  public stylesArray = [
    { value: 'grid', viewValue: 'GRID' },
    { value: 'rowNumber', viewValue: 'ROW_NUMBER' },
    { value: 'columnName', viewValue: 'COLUMNS_NAMES' },
    { value: 'backgroundOnOddRows', viewValue: 'BACKGROUND_ODD_ROWS' },
    { value: 'hideGroupDetails', viewValue: 'GROUP_DETAILS' },
    { value: 'groupNewPage', viewValue: 'GROUP_PAGE' },
    { value: 'firstGroupNewPage', viewValue: 'FIRST_GROUP_PAGE' }
  ];


  public columnsData: Array<OReportColumn>;
  public selectedColumnsData: string[];
  public columnsOrderBy: Array<OReportOrderBy> = [];

  public columnsToGroupData: any[];
  public openedSidenav: boolean = true;
  public fullscreen: boolean = false;

  protected service: string;
  protected serviceRendererData: Array<OReportServiceRenderer> = [];
  protected language: string;
  protected columnsArray: Array<string>;
  protected table: OTableComponent;
  private blankPdf: string = 'JVBERi0xLjYKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAw0DMwslAwtTTVMzI3VbAwMdSzMDNUKErlCtdSyOMKVAAAtxIIrgplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjUwCmVuZG9iagoKNSAwIG9iago8PAo+PgplbmRvYmoKCjYgMCBvYmoKPDwvRm9udCA1IDAgUgovUHJvY1NldFsvUERGL1RleHRdCj4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyA2IDAgUi9NZWRpYUJveFswIDAgNTk1LjMwMzkzNzAwNzg3NCA4NDEuODg5NzYzNzc5NTI4XS9Hcm91cDw8L1MvVHJhbnNwYXJlbmN5L0NTL0RldmljZVJHQi9JIHRydWU+Pi9Db250ZW50cyAyIDAgUj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgNiAwIFIKL01lZGlhQm94WyAwIDAgNTk1IDg0MSBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgo3IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUgovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQovTGFuZyhlcy1FUykKPj4KZW5kb2JqCgo4IDAgb2JqCjw8L0F1dGhvcjxGRUZGMDA1MDAwNjEwMDc0MDA3MjAwNjkwMDYzMDA2OTAwNjEwMDIwMDA0RDAwNjEwMDcyMDA3NDAwRUQwMDZFMDA2NTAwN0EwMDIwMDA1NDAwNjkwMDZDMDA3NjAwNjU+Ci9DcmVhdG9yPEZFRkYwMDU3MDA3MjAwNjkwMDc0MDA2NTAwNzI+Ci9Qcm9kdWNlcjxGRUZGMDA0QzAwNjkwMDYyMDA3MjAwNjUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDIwMDAzNzAwMkUwMDMxPgovQ3JlYXRpb25EYXRlKEQ6MjAyMjA1MTAxNDUyMDYrMDInMDAnKT4+CmVuZG9iagoKeHJlZgowIDkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjM0IDAwMDAwIG4gCjAwMDAwMDAwMTkgMDAwMDAgbiAKMDAwMDAwMDE0MCAwMDAwMCBuIAowMDAwMDAwNDAyIDAwMDAwIG4gCjAwMDAwMDAxNTkgMDAwMDAgbiAKMDAwMDAwMDE4MSAwMDAwMCBuIAowMDAwMDAwNTAwIDAwMDAwIG4gCjAwMDAwMDA1OTYgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDkvUm9vdCA3IDAgUgovSW5mbyA4IDAgUgovSUQgWyA8RDdBODhCRTRFREFDRkU1RDFGMTIwMzNFMDUyN0JERkU+CjxEN0E4OEJFNEVEQUNGRTVEMUYxMjAzM0UwNTI3QkRGRT4gXQovRG9jQ2hlY2tzdW0gLzgwNTA5NDU4QjgyN0RCRDQ2QzlEODdBMjY4NjdCNEFDCj4+CnN0YXJ0eHJlZgo4NzYKJSVFT0YK';

  public currentPreference: OReportPreferences;
  public currentConfiguration: OReportConfiguration;
  public pdf: string;

  constructor(private reportsService: ReportsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReportOnDemandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OTableComponent,
    protected dialogService: DialogService,
    public translateService: OTranslateService,
    protected snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.initialize();
  }

  protected initialize() {
    this.table = this.data;
    this.language = this.translateService.getCurrentLang();
    this.service = this.table.service;
    this.columnsArray = this.parseColumnsVisible();
    this.columnsToGroupData = this.columnsArray;
    this.serviceRendererData = this.parseServiceRenderer();
    this.currentConfiguration = { ENTITY: this.table.entity };
    this.initializeReportPreferences();

    this.getFunctions();
  }

  public previewReport(): void {
    this.openReport();
  }

  public clearCurrentPreferences() {
    this.initializeReportPreferences();
    this.columnsList.deselectAll();
    this.functionsList.deselectAll();
    this.orderByList.deselectAll();
  }

  protected initializeReportPreferences() {
    /* initialize columnsData and functionsData because they are modified by
    changing settings */
    this.columnsData = this.parseReportColumn(this.columnsArray);
    this.functionsData = this.initialFunctionsData;
    this.columnsOrderBy = [];
    this.pdf = this.blankPdf;
    this.currentPreference = new DefaultOReportPreferences();
    this.currentPreference.entity = this.table.entity;
    this.currentPreference.service = this.table.service;
  }

  protected parseColumnsVisible() {
    const visibleColumns = Util.parseArray(this.table.visibleColumns, true);

    return this.table.oTableOptions.columns.filter(oCol => visibleColumns.indexOf(oCol.attr) !== -1 || oCol.definition !== undefined).map(
      (x: OColumn) => x.attr
    )
  }

  protected parseReportColumn(columns: any[]): OReportColumn[] {
    return columns.map(column => {
      return { id: column, name: this.translateService.get(column) }
    });
  }

  protected parseColumnsOrderBy(columnsOrderBy: any): OReportOrderBy[] {
    return columnsOrderBy.map(column => {
      return { columnId: column.columnId, columnName: column.name, ascendent: column.ascendent }
    });
  }

  protected parseServiceRenderer() {
    return this.table.oTableOptions.columns.filter((oCol: OColumn) => (this.table as any).isInstanceOfOTableCellRendererServiceComponent(oCol.renderer)).
      map((oCol: OColumn) => {
        const renderer: any = oCol.renderer;
        return {
          'service': renderer.service,
          'entity': renderer.entity,
          'keyColumn': oCol.attr,
          'valueColumn': renderer.valueColumn,
          'columns': Util.parseArray(renderer.columns),
          'parentKeys': Util.parseArray(renderer.parentKeys)
        }
      });
  }

  protected openReport() {
    this.reportsService.createReport({
      "title": this.currentPreference.title, "groups": this.currentPreference.groups, "entity": this.currentPreference.entity,
      "service": this.currentPreference.service, "vertical": this.currentPreference.vertical, "functions": this.currentPreference.functions,
      "style": this.currentPreference.style, "subtitle": this.currentPreference.subtitle, "columns": this.currentPreference.columns, "orderBy": this.currentPreference.orderBy,
      "language": this.language

    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.pdf = res.data[0].file;
      }
    });
  }

  getFunctions() {
    this.reportsService.getFunctions({
      "columns": this.columnsArray, "entity": this.currentPreference.entity,
      "service": this.currentPreference.service, "language": this.language
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.functionsData = res.data[0].list;
        //this.functionsData = this.parseDefaultFunctionsData(res.data[0].list);
        this.initialFunctionsData = this.functionsData;
      }
    });
  }

  parseDefaultFunctionsData(listColumns: string[]) {
    let functions = [];

    listColumns.
      filter(x =>
        this.serviceRendererData.findIndex(serviceRendererColumn => serviceRendererColumn.keyColumn === x) === -1
      )
      .forEach(column => {
        let obj: OReportFunction = { columnName: column, type: column !== 'TOTAL' ? 'SUM' : column };
        functions.push(obj);
      })

    return functions;
  }

  applyConfiguration(configuration: any) {
    this.clearCurrentPreferences();
    this.currentConfiguration = configuration;
    let preference = JSON.parse(this.currentConfiguration.PREFERENCES);
    this.currentPreference = preference;
    this.currentPreference.columns.forEach((column: OReportColumn) => this.updateColumnsOrderByData(column.id));
    this.columnsData = this.parseReportColumn(this.columnsArray);

    // Set the functionsData with the data that is loaded from the configuration because it changes
    this.functionsData = this.functionsData.map((functionData: OReportFunction) => {
      const index = this.currentPreference.functions.findIndex(x => x.columnName === functionData.columnName);
      if (index > -1) {
        functionData.type = this.currentPreference.functions[index].type;
      }
      return functionData
    });

    this.columnsData.sort((a: OReportColumn, b: OReportColumn) => {
      let indexA = this.currentPreference.columns.findIndex(x => x.id === a.id);
      let indexB = this.currentPreference.columns.findIndex(x => x.id === b.id);
      return this.getSortIndex(indexA, indexB);

    });
    this.columnsOrderBy.sort((a: OReportOrderBy, b: OReportOrderBy) => {
      let indexA = this.currentPreference.columns.findIndex(x => x.id === a.columnId);
      let indexB = this.currentPreference.columns.findIndex(x => x.id === b.columnId);
      return this.getSortIndex(indexA, indexB);

    });
    this.columnsToGroupData.sort((a: string, b: string) => {
      let indexA = this.currentPreference.columns.findIndex(x => x.id === a);
      let indexB = this.currentPreference.columns.findIndex(x => x.id === b);
      return this.getSortIndex(indexA, indexB);
    });

  }

  private getSortIndex(indexA: number, indexB: number): number {
    if (indexA === -1) {
      return 0;
    }
    if (indexB === -1) {
      return indexA;
    } else {
      return indexA - indexB;
    }

  }

  showColumnStyleDialog(event: Event, id: string): void {
    event.stopPropagation();
    const columnData: OReportColumn = Object.assign({}, this.currentPreference.columns.find((x: OReportColumn) => x.id === id));
    if (Util.isDefined(columnData)) {
      this.dialog
        .open(StyleDialogComponent, {
          data: columnData,
          panelClass: ['o-dialog-class', 'o-table-dialog']
        })
        .afterClosed()
        .subscribe((data: OReportColumn) => {
          if (Util.isDefined(data) && data) {
            const column = Utils.cloneObject(data);
            this.updateColumnStyleConfigurationData(column);
          }
        });
    }
  }

  updateColumnStyleConfigurationData(data: OReportColumn) {


    let columns = Utils.cloneObject(this.currentPreference.columns);
    this.currentPreference.columns = [];
    const indexColumnData = this.columnsData.findIndex(x => x.id === data.id);
    if (indexColumnData > -1) {
      this.columnsData[indexColumnData] = data;
    }
    const indexColumnStyleData = columns.findIndex(x => x.id === data.id);
    if (indexColumnStyleData > -1) {
      columns[indexColumnStyleData] = data;
    }

    this.currentPreference.columns = columns;

  }


  selectFunction(event, functionName: string): void {
    event.stopPropagation();
    if (functionName != 'TOTAL') {
      this.dialog
        .open(SelectFunctionDialogComponent, {
          data: functionName,
          panelClass: ['o-dialog-class', 'o-table-dialog']
        })
        .afterClosed()
        .subscribe((data: any) => {
          //Updated current functions selected and functionsData
          if (data) {
            const index = data.indexOf('-');
            const columnName = data.substring(0, index);
            const functionName = data.substring(index + 1);
            this.updatedFunctionData(columnName, functionName);
            this.updatedSelectFunction(columnName, functionName);
          }
        });
    }
  }

  private updatedFunctionData(columnName: string, functionName: any) {
    const index = this.functionsData.findIndex(x => x.columnName === columnName);
    if (index === -1) {

      this.functionsData.push({ columnName: columnName, type: functionName });
    } else {
      this.functionsData[index] = { columnName: columnName, type: functionName };
    }
  }

  private updatedSelectFunction(columnNameSelected: string, functionNameSelected: any) {
    this.currentPreference.functions.forEach((data: any, i: number) => {
      const index = data.indexOf('-');
      const columnName = data.substring(0, index);
      if (columnName === columnNameSelected) {
        this.currentPreference.functions[i].columnName = columnName;
        this.currentPreference.functions[i].type = functionNameSelected;
        //this.currentPreference.functions[i] = columnName + '-' + functionNameSelected;
      }
    })
  }

  openSaveAsPreferences(): void {
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

  dropColumns(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsData, event.previousIndex, event.currentIndex);
    this.updateColumnsSort();
  }

  dropGroups(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columnsToGroupData, event.previousIndex, event.currentIndex)
    this.updateColumnToGroupSort();
  }

  dropColumnsOrderBy(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsOrderBy, event.previousIndex, event.currentIndex);
    this.updateColumnGroupBySort();
  }

  updateColumnsSort() {
    this.currentPreference.columns.sort((a: OReportColumn, b: OReportColumn) => {
      let indexA = this.columnsData.findIndex(x => x.id === a.id);
      let indexB = this.columnsData.findIndex(x => x.id === b.id);
      return indexA - indexB;
    });
  }

  updateColumnGroupBySort() {
    this.currentPreference.orderBy.sort((a: OReportOrderBy, b: OReportOrderBy) => {
      let indexA = this.columnsOrderBy.findIndex(x => x.columnId === a.columnId);
      let indexB = this.columnsOrderBy.findIndex(x => x.columnId === b.columnId);
      return indexA - indexB;
    });
  }

  updateColumnToGroupSort() {
    this.currentPreference.groups.sort((a: string, b: string) => {
      let indexA = this.columnsToGroupData.findIndex(x => x === a);
      let indexB = this.columnsToGroupData.findIndex(x => x === b);
      return indexA - indexB;
    });
  }

  public onApplyConfigurationClicked(): void {
    this.dialog.open(ApplyConfigurationDialogComponent, {
      width: 'calc((75em - 100%) * 1000)',
      maxWidth: '65vw',
      minWidth: '30vw',
      disableClose: true,
      panelClass: ['o-dialog-class', 'o-table-dialog'],
      data: { entity: this.currentPreference.entity, service: this.currentPreference.service },
    }).afterClosed()
      .subscribe((data: OReportConfiguration) => {
        if (Util.isDefined(data) && data) {
          this.applyConfiguration(data);
          this.appliedConfiguration = true;
        }
      }, _error => {
        this.appliedConfiguration = false;
      });
  }

  openSavePreferences(): void {
    if (Util.isDefined(this.currentConfiguration.ID)) {
      this.savePreferences({ name: this.currentConfiguration.NAME, description: this.currentConfiguration.DESCRIPTION }, true);
    } else {
      this.dialog
        .open(SavePreferencesDialogComponent, {
          panelClass: ['o-dialog-class', 'o-table-dialog']
        })
        .afterClosed()
        .subscribe((data: { name: string, description: string }) => {
          if (Util.isDefined(data) && data) {
            this.savePreferences(data, true);
          }
        });
    }

  }

  savePreferences(data: any, update?: boolean) {
    let preference = {
      "name": data.name, "description": data.description,
      "entity": this.currentPreference.entity, "service": this.currentPreference.service, "reportParams": {
        "title": this.currentPreference.title, "groups": this.currentPreference.groups,
        "vertical": this.currentPreference.vertical, "functions": this.currentPreference.functions, "style": this.currentPreference.style,
        "subtitle": this.currentPreference.subtitle, "columns": this.currentPreference.columns, "orderBy": this.currentPreference.orderBy, "entity": this.currentPreference.entity, "service": this.currentPreference.service
      }
    }

    if (update) {
      this.reportsService.savePreferences(this.currentConfiguration.ID, preference).subscribe(res => {
        this.showConfirmOperatinInSnackBar(res);
      });
    } else {
      this.reportsService.saveAsPreferences(preference).subscribe(res => {
        if (res && res.code === 0) {
          this.showConfirmOperatinInSnackBar(res);
        }
      });
    }
  }

  private showConfirmOperatinInSnackBar(res: any) {
    if (res && res.code === 0) {
      this.snackBarService.open('MESSAGES.SAVED', { icon: 'check_circle' });
    }
  }

  getFunctionValue(reportFunction: OReportFunction) {
    if (reportFunction.columnName === 'TOTAL') {
      return reportFunction.columnName;
    } else {
      return reportFunction.columnName + '-' + reportFunction.type;
    }
  }

  setFullscreenDialog(): void {
    Utils.setFullscreenDialog(this.fullscreen, this.dialogRef);
    this.fullscreen = !this.fullscreen;
  }

  onSelectionChangeColumns(event: MatSelectionListChange) {
    const selectedColumn: OReportColumn = event.option.value;
    const selectColumnId = selectedColumn.id;
    this.updateColumnsOrderByData(selectColumnId, event);

  }

  onSelectionChangeGroups(event: MatSelectionListChange) {
    if (!event.option.selected) return;
    let groupSelected: string = event.option.value;
    this.updateColumnsOrderByData(groupSelected, event);
    if (event.option.selected &&
      this.currentPreference.columns.findIndex(x => x.id === groupSelected) === -1) {
      const columnStyleSelected: OReportColumn = { id: groupSelected, name: this.translateService.get(groupSelected) };
      this.addColumnData(columnStyleSelected);
    }
  }


  updateColumnsOrderByData(columnId: string, event?: MatSelectionListChange) {

    if (!event) {
      const existColumn = this.columnsArray.findIndex(col => col === columnId);
      if (existColumn === -1) {
        console.warn('The loaded configuration has the column ' + columnId + ' configured but this column does not exist as a table column');
        return;
      }
    }

    const columnGroupBySelected: OReportOrderBy = { columnId: columnId, ascendent: true }
    let index = this.columnsOrderBy.findIndex(x => x.columnId === columnId);
    if ((!event) || (event && event.option.selected)) {
      if (index === -1) {
        this.columnsOrderBy.push(columnGroupBySelected);
      }
    }
    else if (index > -1) {
      this.columnsOrderBy.splice(index);
    }

  }


  addColumnData(columnSelected) {
    //Object Deep Cloning
    let currentPreference = Utils.cloneObject(this.currentPreference);
    currentPreference.columns.push(columnSelected);
    this.currentPreference = currentPreference;
    this.updateColumnsSort();
  }

  onSelectionChangeFunctions(event: MatSelectionListChange) {
    if (!event.option.selected || event.option.value.columnName === 'TOTAL') return;
    const functionSelect = event.option.value;
    const columnSelectedToGroup = functionSelect.columnName;

    if (event.option.selected &&
      this.currentPreference.columns.findIndex(x => x.id === columnSelectedToGroup) === -1) {
      const column: OReportColumn = { id: columnSelectedToGroup, name: this.translateService.get(columnSelectedToGroup) }
      this.addColumnData(column);
    }
  }


  changeOrder(column: OReportOrderBy, event) {
    const columnSelectedToOrder = this.columnsOrderBy.find(x => x.columnId === column.columnId);
    if (columnSelectedToOrder) {
      columnSelectedToOrder.ascendent = !columnSelectedToOrder.ascendent;
    }
    event.stopPropagation();
  }

  isCheckedColumn(column: OReportColumn) {
    return this.currentPreference.columns.length > 0 ? this.currentPreference.columns.filter(x => x.id === column.id).length > 0 : false;
  }

  isCheckedFunction(column: OReportFunction) {
    return this.currentPreference.functions.length > 0 ? this.currentPreference.functions.filter(x => (x.columnName === column.columnName && x.type === column.type) && x.type !== 'TOTAL').length > 0 : false;
  }

  columnsOrderByCompareFunction(co1: OReportOrderBy, co2: OReportOrderBy) {
    return co1.columnId === co2.columnId;
  }

  onCheckboxStyleClick(value) {
    if (this.currentPreference.style[value]) {
      this.currentPreference.style[value] = false;
    } else {
      this.currentPreference.style[value] = true;
    }
  }

  columnsCompareFunction(co1: OReportColumn, co2: OReportColumn) {
    return co1.id === co2.id;
  }
  functionsCompareFunction(co1: OReportFunction, co2: OReportFunction) {
    return co1.columnName === co2.columnName;
  }
}