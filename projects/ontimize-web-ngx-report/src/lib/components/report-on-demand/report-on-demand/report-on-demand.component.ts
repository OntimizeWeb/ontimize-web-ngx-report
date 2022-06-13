import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSelectionListChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService, OTranslateService, SnackBarService, Util } from 'ontimize-web-ngx';
import { ReportsService } from '../../../services/reports.service';
import { OReportStyleParams } from '../../../types';

import { OReportColumnStyle } from '../../../types/report-column-style.type';
import { OReportColumn } from '../../../types/report-column.type';
import { OReportConfiguration } from '../../../types/report-configuration.type';
import { OReportFunction } from '../../../types/report-function.type';
import { OReportOrderBy } from '../../../types/report-orderBy.type';
import { OReportPreferences } from '../../../types/report-preferences.type';
import { ApplyConfigurationDialogComponent } from '../apply-configuration/apply-configuration-dialog.component';
import { SavePreferencesDialogComponent } from '../save-preferences-dialog/save-preferences-dialog.component';
import { SelectFunctionDialogComponent } from '../select-function-dialog/select-function-dialog.component';

import { StyleDialogComponent } from '../style-dialog/style-dialog.component';

export const DEFAULT_WIDTH_DIALOG = '70%';
export const DEFAULT_HEIGHT_DIALOG = '90%';
export const DEFAULT_COLUMN_STYLE: OReportColumnStyle = { width: 85, alignment: 'left' };

@Component({
  selector: 'app-customers-dialog',
  templateUrl: './report-on-demand.component.html',
  styleUrls: ['./report-on-demand.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ReportOnDemandComponent implements OnInit {

  public pdf: string = 'JVBERi0xLjYKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAw0DMwslAwtTTVMzI3VbAwMdSzMDNUKErlCtdSyOMKVAAAtxIIrgplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjUwCmVuZG9iagoKNSAwIG9iago8PAo+PgplbmRvYmoKCjYgMCBvYmoKPDwvRm9udCA1IDAgUgovUHJvY1NldFsvUERGL1RleHRdCj4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyA2IDAgUi9NZWRpYUJveFswIDAgNTk1LjMwMzkzNzAwNzg3NCA4NDEuODg5NzYzNzc5NTI4XS9Hcm91cDw8L1MvVHJhbnNwYXJlbmN5L0NTL0RldmljZVJHQi9JIHRydWU+Pi9Db250ZW50cyAyIDAgUj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgNiAwIFIKL01lZGlhQm94WyAwIDAgNTk1IDg0MSBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgo3IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUgovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQovTGFuZyhlcy1FUykKPj4KZW5kb2JqCgo4IDAgb2JqCjw8L0F1dGhvcjxGRUZGMDA1MDAwNjEwMDc0MDA3MjAwNjkwMDYzMDA2OTAwNjEwMDIwMDA0RDAwNjEwMDcyMDA3NDAwRUQwMDZFMDA2NTAwN0EwMDIwMDA1NDAwNjkwMDZDMDA3NjAwNjU+Ci9DcmVhdG9yPEZFRkYwMDU3MDA3MjAwNjkwMDc0MDA2NTAwNzI+Ci9Qcm9kdWNlcjxGRUZGMDA0QzAwNjkwMDYyMDA3MjAwNjUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDIwMDAzNzAwMkUwMDMxPgovQ3JlYXRpb25EYXRlKEQ6MjAyMjA1MTAxNDUyMDYrMDInMDAnKT4+CmVuZG9iagoKeHJlZgowIDkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjM0IDAwMDAwIG4gCjAwMDAwMDAwMTkgMDAwMDAgbiAKMDAwMDAwMDE0MCAwMDAwMCBuIAowMDAwMDAwNDAyIDAwMDAwIG4gCjAwMDAwMDAxNTkgMDAwMDAgbiAKMDAwMDAwMDE4MSAwMDAwMCBuIAowMDAwMDAwNTAwIDAwMDAwIG4gCjAwMDAwMDA1OTYgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDkvUm9vdCA3IDAgUgovSW5mbyA4IDAgUgovSUQgWyA8RDdBODhCRTRFREFDRkU1RDFGMTIwMzNFMDUyN0JERkU+CjxEN0E4OEJFNEVEQUNGRTVEMUYxMjAzM0UwNTI3QkRGRT4gXQovRG9jQ2hlY2tzdW0gLzgwNTA5NDU4QjgyN0RCRDQ2QzlEODdBMjY4NjdCNEFDCj4+CnN0YXJ0eHJlZgo4NzYKJSVFT0YK';
  public orientations = [{ text: "vertical", value: true }, { text: "horizontal", value: false }];
  public functionsData: OReportFunction[] = [];
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
  public columnsToSort: string[];
  public columnsOrderBy: Array<OReportOrderBy> = [];

  public columnsToGroupData: any[];
  public openedSidenav: boolean = true;
  public fullscreen: boolean = false;

  protected service: string;

  public currentPreference: OReportPreferences;
  public currentConfiguration: OReportConfiguration;

  constructor(private reportsService: ReportsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReportOnDemandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogService: DialogService,
    public translateService: OTranslateService,
    protected snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.initialize();
  }

  protected initialize() {
    this.service = this.data.service;
    const columnsData = this.data.columns.split(';');
    this.columnsData = this.parseColumnStyle(columnsData);
    this.columnsToGroupData = columnsData;
    this.currentPreference = {
      title: '', subtitle: '', vertical: true, columns: [], groups: [], functions: [], style: {
        grid: false, rowNumber: false, columnName: true, backgroundOnOddRows: false, hideGroupDetails: false, groupNewPage: false, firstGroupNewPage: false
      }, orderBy: []
    };
    this.currentConfiguration = { ENTITY: this.data.entity }

    this.getFunctions();
  }

  public previewReport(): void {
    this.openReport();
  }


  protected parseColumnStyle(columns: any[]): OReportColumn[] {

    return columns.map(column => {
      return { id: column, name: this.translateService.get(column) }
    });
  }

  protected parseColumnsOrderBy(columnsOrderBy: any): OReportOrderBy[] {
    return columnsOrderBy.map(column => {
      return { columnId: column.columnId, columnName: column.name, ascendent: column.ascendent }
    });
  }

  protected openReport() {
    this.reportsService.createReport({
      "title": this.currentPreference.title, "groups": this.currentPreference.groups, "entity": this.currentConfiguration.ENTITY,
      "service": this.service, "vertical": this.currentPreference.vertical, "functions": this.currentPreference.functions,
      "style": this.currentPreference.style, "subtitle": this.currentPreference.subtitle, "columns": this.currentPreference.columns, "orderBy": this.currentPreference.orderBy,

    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.pdf = res.data[0].file;
      }
    });
  }

  getFunctions() {
    this.reportsService.getFunctions({
      "columns": this.data.columns.split(";"), "entity": this.currentConfiguration.ENTITY,
      "service": this.service, "language": this.translateService.getCurrentLang()
    }).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        this.functionsData = this.parseDefaultFunctionsData(res.data[0].list);
      }
    });
  }

  parseDefaultFunctionsData(list: any[]) {
    let functions = [];
    list.forEach(column => {
      let obj: OReportFunction;
      if (column !== 'TOTAL') {
        obj = { columnName: column, functionName: 'SUM' };
      } else {
        obj = { columnName: column, functionName: column };
      }
      functions.push(obj);
    })
    return functions;
  }

  applyConfiguration(configuration: any) {
    this.currentConfiguration = configuration;
    let preference = JSON.parse(this.currentConfiguration.PREFERENCES);
    this.currentPreference = preference;

  }


  showColumnStyleDialog(event, id): void {
    event.stopPropagation();
    const columnData: OReportColumn = this.currentPreference.columns.find((x: OReportColumn) => x.id === id);
    this.dialog
      .open(StyleDialogComponent, {
        data: columnData ? columnData : id,
        panelClass: ['o-dialog-class', 'o-table-dialog']
      })
      .afterClosed()
      .subscribe((data: OReportColumn) => {
        if (Util.isDefined(data) && data) {
          this.updateColumnStyleConfigurationData(data);
        }
      });
  }

  updateColumnStyleConfigurationData(data: OReportColumn) {
    const indexColumnStyleData = this.currentPreference.columns.findIndex(x => x.id === data.id);
    if (indexColumnStyleData > -1) {
      this.currentPreference.columns[indexColumnStyleData] = data;
    }
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
            this.functionsData = this.updatedSelectFunctionInArray(columnName, functionName, this.functionsData);
            this.currentPreference.functions = this.updatedSelectFunctionInArray(columnName, functionName, this.currentPreference.functions);
          }
        });
    }
  }

  private updatedSelectFunctionInArray(columnName: any, functionName: any, dataArray: any[]) {
    const index = dataArray.findIndex(x => x.columnName === columnName);
    if (index === -1) {
      dataArray.push({ columnName: columnName, functionName: functionName });
    } else {
      dataArray[index] = { columnName: columnName, functionName: functionName };
    }
    return dataArray;
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
    this.updateColumnStyleSort();
  }

  dropGroups(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columnsToGroupData, event.previousIndex, event.currentIndex)
    this.updateColumnToGroupSort();
  }

  dropColumnsOrderBy(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsOrderBy, event.previousIndex, event.currentIndex);
    this.updateColumnGroupBySort();
  }

  updateColumnStyleSort() {
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
      data: this,
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
      this.savePreferences({ name: this.currentConfiguration.NAME, description: this.currentConfiguration.NAME });
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
      "entity": this.currentConfiguration.ENTITY, "title": this.currentPreference.title, "groups": this.currentPreference.groups,
      "vertical": this.currentPreference.vertical, "functions": this.currentPreference.functions, "style": this.currentPreference.style,
      "subtitle": this.currentPreference.subtitle, "columns": this.currentPreference.columns, "orderBy": this.currentPreference.orderBy
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
      return reportFunction.columnName + '-' + reportFunction.functionName;
    }
  }

  setFullscreenDialog(): void {
    if (!this.fullscreen) {
      this.dialogRef.updateSize("100%", "100%");
    } else {
      this.dialogRef.updateSize(DEFAULT_WIDTH_DIALOG, DEFAULT_HEIGHT_DIALOG);
    }
    this.fullscreen = !this.fullscreen;
  }

  onSelectionChangeColumns(event: MatSelectionListChange) {
    const selectedColumn: OReportColumn = event.option.value;
    const selectColumnId = selectedColumn.id;
    this.updateColumnsOrderByData(event, selectColumnId,);

  }

  onSelectionChangeGroups(event: MatSelectionListChange) {
    if (!event.option.selected) return;
    let groupSelected: string = event.option.value;
    this.updateColumnsOrderByData(event, groupSelected);
    if (event.option.selected &&
      this.currentPreference.columns.findIndex(x => x.id === groupSelected) === -1) {
      const columnStyleSelected: OReportColumn = { id: groupSelected, name: this.translateService.get(groupSelected) };
      this.addColumnData(columnStyleSelected);
    }
  }


  updateColumnsOrderByData(event: MatSelectionListChange, columnId: string) {
    const columnGroupBySelected: OReportOrderBy = { columnId: columnId, ascendent: true }
    let index = this.columnsOrderBy.findIndex(x => x.columnId === columnId);
    if (event.option.selected) {
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
    let currentPreference = JSON.parse(JSON.stringify(this.currentPreference));
    currentPreference.columns.push(columnSelected);
    this.currentPreference = currentPreference;
  }

  onSelectionChangeFunctions(event: MatSelectionListChange) {
    if (!event.option.selected || event.option.value === 'TOTAL') return;
    const functionSelect = event.option.value;
    const columnSelectedToGroup = functionSelect.substring(0, functionSelect.indexOf('-'));

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
    return this.currentPreference.functions.length > 0 ? this.currentPreference.functions.filter(x => (x === column.columnName + '-' + column.functionName) && x !== 'TOTAL').length > 0 : false;
  }

  columnsOrderByCompareFunction(co1: OReportOrderBy, co2: OReportOrderBy) {
    return co1.columnId === co2.columnId;
  }

  onCheckboxStyleClick(value) {
    this.currentPreference.style[value] == true ? this.currentPreference.style[value] = false : this.currentPreference.style[value] = true
  }

  columnsCompareFunction(co1: OReportColumn, co2: OReportColumn) {
    return co1.id === co2.id;
  }

  functionsCompareFunction(co1: OReportFunction, co2: OReportFunction) {
    return co1.columnName === co2.columnName;
  }

}