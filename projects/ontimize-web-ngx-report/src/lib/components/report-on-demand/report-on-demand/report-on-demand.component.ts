import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService, OTranslateService, Util } from 'ontimize-web-ngx';
import { ReportsService } from '../../../services/reports.service';

import { OReportColumnsStyle } from '../../../types/report-column-style.type';
import { OReportConfiguration } from '../../../types/report-configuration.type';
import { ReportFunction } from '../../../types/report-function.type';
import { OReportOrderBy } from '../../../types/report-orderBy.type';
import { OReportPreferences } from '../../../types/report-preferences.type';
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
})

export class ReportOnDemandComponent implements OnInit {

  @ViewChild('functionsList', { static: false }) functionList: MatSelectionList;
  public pdf: string = 'JVBERi0xLjYKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAw0DMwslAwtTTVMzI3VbAwMdSzMDNUKErlCtdSyOMKVAAAtxIIrgplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjUwCmVuZG9iagoKNSAwIG9iago8PAo+PgplbmRvYmoKCjYgMCBvYmoKPDwvRm9udCA1IDAgUgovUHJvY1NldFsvUERGL1RleHRdCj4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyA2IDAgUi9NZWRpYUJveFswIDAgNTk1LjMwMzkzNzAwNzg3NCA4NDEuODg5NzYzNzc5NTI4XS9Hcm91cDw8L1MvVHJhbnNwYXJlbmN5L0NTL0RldmljZVJHQi9JIHRydWU+Pi9Db250ZW50cyAyIDAgUj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgNiAwIFIKL01lZGlhQm94WyAwIDAgNTk1IDg0MSBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgo3IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUgovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQovTGFuZyhlcy1FUykKPj4KZW5kb2JqCgo4IDAgb2JqCjw8L0F1dGhvcjxGRUZGMDA1MDAwNjEwMDc0MDA3MjAwNjkwMDYzMDA2OTAwNjEwMDIwMDA0RDAwNjEwMDcyMDA3NDAwRUQwMDZFMDA2NTAwN0EwMDIwMDA1NDAwNjkwMDZDMDA3NjAwNjU+Ci9DcmVhdG9yPEZFRkYwMDU3MDA3MjAwNjkwMDc0MDA2NTAwNzI+Ci9Qcm9kdWNlcjxGRUZGMDA0QzAwNjkwMDYyMDA3MjAwNjUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDIwMDAzNzAwMkUwMDMxPgovQ3JlYXRpb25EYXRlKEQ6MjAyMjA1MTAxNDUyMDYrMDInMDAnKT4+CmVuZG9iagoKeHJlZgowIDkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjM0IDAwMDAwIG4gCjAwMDAwMDAwMTkgMDAwMDAgbiAKMDAwMDAwMDE0MCAwMDAwMCBuIAowMDAwMDAwNDAyIDAwMDAwIG4gCjAwMDAwMDAxNTkgMDAwMDAgbiAKMDAwMDAwMDE4MSAwMDAwMCBuIAowMDAwMDAwNTAwIDAwMDAwIG4gCjAwMDAwMDA1OTYgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDkvUm9vdCA3IDAgUgovSW5mbyA4IDAgUgovSUQgWyA8RDdBODhCRTRFREFDRkU1RDFGMTIwMzNFMDUyN0JERkU+CjxEN0E4OEJFNEVEQUNGRTVEMUYxMjAzM0UwNTI3QkRGRT4gXQovRG9jQ2hlY2tzdW0gLzgwNTA5NDU4QjgyN0RCRDQ2QzlEODdBMjY4NjdCNEFDCj4+CnN0YXJ0eHJlZgo4NzYKJSVFT0YK';
  public orientations = [{ text: "vertical", value: true }, { text: "horizontal", value: false }];
  public functionsData: ReportFunction[] = [];
  public appliedConfiguration: boolean = false;
  public selectedFunctions = [];
  @ViewChild('functionsList', { static: false })
  public functionsList: MatSelectionList;
  public dataArray = [
    { value: 'grid', viewValue: 'GRID' },
    { value: 'rowNumber', viewValue: 'ROW_NUMBER' },
    { value: 'columnName', viewValue: 'COLUMNS_NAMES' },
    { value: 'backgroundOnOddRows', viewValue: 'BACKGROUND_ODD_ROWS' },
    { value: 'hideGroupDetails', viewValue: 'GROUP_DETAILS' },
    { value: 'groupNewPage', viewValue: 'GROUP_PAGE' },
    { value: 'firstGroupNewPage', viewValue: 'FIRST_GROUP_PAGE' }
  ];

  public columnsData: any[];
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
    this.currentPreference = { title: '', subtitle: '', vertical: true, columns: [], groups: [], functions: [], styleFunctions: ['columnName'], columnsStyle: [], columnsOrderBy: [] };
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
    let functions = this.currentPreference.functions.map(
      x => {
        if (x.columnName === 'TOTAL') return x.columnName; else return x.columnName + '-' + x.functionName;
      });
    this.reportsService.createReport({
      "title": this.currentPreference.title, "columns": columns, "groups": this.currentPreference.groups, "entity": this.currentConfiguration.ENTITY,
      "service": this.service, "orientation": orientation, "functions": functions,
      "styleFunctions": this.currentPreference.styleFunctions, "subtitle": this.currentPreference.subtitle, "columnStyle": this.currentPreference.columnsStyle, "orderBy": this.currentPreference.columnsOrderBy
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
      let obj: ReportFunction;
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
    this.appliedConfiguration = true;
    this.selectedFunctions = this.parseStringToArray(preference.functions);
    this.currentPreference = {
      title: preference.title,
      subtitle: preference.subtitle,
      vertical: preference.vertical,
      columns: this.parseStringToArray(preference.columns),
      functions: this.parseDefaultFunctionsData(this.parseStringToArray(preference.functions)),
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
            this.functionList.deselectAll();
            const columnName = data.substring(0, index);
            const functionName = data.substring(index + 1);
            this.functionsData = this.updatedSelectFunctionInArray(columnName, functionName, this.functionsData);
            this.currentPreference.functions = this.updatedSelectFunctionInArray(columnName, functionName, this.currentPreference.functions);

          }
        });
    }
  }

  private updatedSelectFunctionInArray(columnName: any, functionName: any, dataArray: any[]) {
    let index = dataArray.findIndex(x => x.columnName === columnName);
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
          this.saveAsPreferences(data);
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
    this.currentPreference.columnsStyle.sort((a: OReportColumnsStyle, b: OReportColumnsStyle) => {
      let indexA = this.columnsData.findIndex(x => x.id === a.id);
      let indexB = this.columnsData.findIndex(x => x.id === b.id);
      return indexA - indexB;
    });
  }
  updateColumnGroupBySort() {
    this.currentPreference.columnsOrderBy.sort((a: OReportOrderBy, b: OReportOrderBy) => {
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
            this.saveAsPreferences(data);
          }
        });
    }

  }

  savePreferences(data: any) {
    let columns = this.currentPreference.columnsStyle.map(x => x.id);
    let functions = this.currentPreference.functions.map(
      x => {
        if (x.columnName === 'TOTAL') return x.columnName; else return x.columnName + '-' + x.functionName;
      });
    let preference = {
      "name": data.name, "description": data.description,
      "entity": this.currentConfiguration.ENTITY, "title": this.currentPreference.title, "columns": columns, "groups": this.currentPreference.groups,
      "vertical": this.currentPreference.vertical, "functions": functions, "styleFunctions": this.currentPreference.styleFunctions,
      "subtitle": this.currentPreference.subtitle, "columnsStyle": this.currentPreference.columnsStyle, "orderBy": this.currentPreference.columnsOrderBy
    }

    this.reportsService.savePreferences(this.currentConfiguration.ID, preference).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
      }
    });
  }

  saveAsPreferences(data) {
    let columns = this.currentPreference.columnsStyle.map(x => x.id);
    let functions = this.extractFunction();
    let preference = {
      "name": data.name, "description": data.description,
      "entity": this.currentConfiguration.ENTITY, "title": this.currentPreference.title, "columns": columns, "groups": this.currentPreference.groups,
      "vertical": this.currentPreference.vertical, "functions": functions, "styleFunctions": this.currentPreference.styleFunctions,
      "subtitle": this.currentPreference.subtitle, "columnsStyle": this.currentPreference.columnsStyle, "orderBy": this.currentPreference.columnsOrderBy
    }

    this.reportsService.saveAsPreferences(preference).subscribe(res => {
      if (res && res.data.length && res.code === 0) {
        // this.currentPreference = preference;
      }
    });

  }

  private extractFunction() {
    return this.currentPreference.functions.map(
      x => {
        if (x.columnName === 'TOTAL')
          return x.columnName; else
          return x.columnName + '-' + x.functionName;
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

  onSelectionChangeColumns(event: MatSelectionListChange) {
    let functionSelected: string = event.option.value.id;
    const columnGroupBySelected: OReportOrderBy = { columnId: functionSelected, columnName: this.translateService.get(functionSelected), ascendent: true }
    if (event.option.selected) {
      if ((this.columnsOrderBy.find(x => x.columnId === functionSelected)) == null) {
        this.columnsOrderBy.push(columnGroupBySelected);
      }
    }
    else {
      let index = this.columnsOrderBy.find(x => x.columnId === functionSelected);
      if (index != null) {
        this.columnsOrderBy.splice(this.columnsOrderBy.indexOf(index));
      }
    }

  }

  onSelectionChangeGroups(event: MatSelectionListChange) {
    if (!event.option.selected || event.option.value.columnName === 'TOTAL') return;
    let functionSelected: string = event.option.value;
    if (event.option.selected &&
      this.currentPreference.columnsStyle.findIndex(x => x.id === functionSelected) === -1) {
      const columnStyleSelected: OReportColumnsStyle = { id: functionSelected, name: this.translateService.get(functionSelected), width: 85, alignment: 'left' };
      this.currentPreference.columnsStyle.push(columnStyleSelected);
    }
  }

  onSelectionChangeFunctions(event: MatSelectionListChange) {
    if (!event.option.selected || event.option.value.columnName === 'TOTAL') return;
    const columnSelectedToGroup = event.option.value.columnName;
    let columnStyleSelected: OReportColumnsStyle = { id: columnSelectedToGroup, name: this.translateService.get(columnSelectedToGroup), width: 85, alignment: 'left' };

    if (event.option.selected &&
      this.currentPreference.columnsStyle.findIndex(x => x.id === columnSelectedToGroup) === -1) {
      this.currentPreference.columnsStyle.push(columnStyleSelected);
    }
  }

  changeOrder(column, order, event) {
    if (order) {
      this.columnsOrderBy.find(x => x.columnId === column).ascendent = false;
    }
    else { this.columnsOrderBy.find(x => x.columnId === column).ascendent = true; }
    event.stopPropagation();
  }
  isCheckedColumn(column) {
    const isCheckedColumn = this.currentPreference.columnsStyle.length > 0 ? this.currentPreference.columnsStyle.filter(x => x.id === column.id).length > 0 : false;
    return isCheckedColumn;
  }

  private parseStringToArray(data): string[] {
    const stringParsed = data.replace("[", "").replace("]", "").replace(/ /g, "");
    return stringParsed.length === 0 ? [] : stringParsed.split(',');
  }


}