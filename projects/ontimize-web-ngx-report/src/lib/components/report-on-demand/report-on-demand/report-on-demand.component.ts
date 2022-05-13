import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService, OTranslateService, Util } from 'ontimize-web-ngx';
import { ReportsService } from '../../../services/reports.service';

import { OReportColumnsStyle } from '../../../types/report-column-style.type';
import { OReportConfiguration } from '../../../types/report-configuration.type';
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
  encapsulation: ViewEncapsulation.None
})

export class ReportOnDemandComponent implements OnInit {

  @ViewChild('columnsList', { static: true }) columnsList: MatSelectionList;
  public pdf: string = 'JVBERi0xLjYKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAw0DMwslAwtTTVMzI3VbAwMdSzMDNUKErlCtdSyOMKVAAAtxIIrgplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjUwCmVuZG9iagoKNSAwIG9iago8PAo+PgplbmRvYmoKCjYgMCBvYmoKPDwvRm9udCA1IDAgUgovUHJvY1NldFsvUERGL1RleHRdCj4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyA2IDAgUi9NZWRpYUJveFswIDAgNTk1LjMwMzkzNzAwNzg3NCA4NDEuODg5NzYzNzc5NTI4XS9Hcm91cDw8L1MvVHJhbnNwYXJlbmN5L0NTL0RldmljZVJHQi9JIHRydWU+Pi9Db250ZW50cyAyIDAgUj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgNiAwIFIKL01lZGlhQm94WyAwIDAgNTk1IDg0MSBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgo3IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUgovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQovTGFuZyhlcy1FUykKPj4KZW5kb2JqCgo4IDAgb2JqCjw8L0F1dGhvcjxGRUZGMDA1MDAwNjEwMDc0MDA3MjAwNjkwMDYzMDA2OTAwNjEwMDIwMDA0RDAwNjEwMDcyMDA3NDAwRUQwMDZFMDA2NTAwN0EwMDIwMDA1NDAwNjkwMDZDMDA3NjAwNjU+Ci9DcmVhdG9yPEZFRkYwMDU3MDA3MjAwNjkwMDc0MDA2NTAwNzI+Ci9Qcm9kdWNlcjxGRUZGMDA0QzAwNjkwMDYyMDA3MjAwNjUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDIwMDAzNzAwMkUwMDMxPgovQ3JlYXRpb25EYXRlKEQ6MjAyMjA1MTAxNDUyMDYrMDInMDAnKT4+CmVuZG9iagoKeHJlZgowIDkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjM0IDAwMDAwIG4gCjAwMDAwMDAwMTkgMDAwMDAgbiAKMDAwMDAwMDE0MCAwMDAwMCBuIAowMDAwMDAwNDAyIDAwMDAwIG4gCjAwMDAwMDAxNTkgMDAwMDAgbiAKMDAwMDAwMDE4MSAwMDAwMCBuIAowMDAwMDAwNTAwIDAwMDAwIG4gCjAwMDAwMDA1OTYgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDkvUm9vdCA3IDAgUgovSW5mbyA4IDAgUgovSUQgWyA8RDdBODhCRTRFREFDRkU1RDFGMTIwMzNFMDUyN0JERkU+CjxEN0E4OEJFNEVEQUNGRTVEMUYxMjAzM0UwNTI3QkRGRT4gXQovRG9jQ2hlY2tzdW0gLzgwNTA5NDU4QjgyN0RCRDQ2QzlEODdBMjY4NjdCNEFDCj4+CnN0YXJ0eHJlZgo4NzYKJSVFT0YK';
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

  public columnsData: any[];
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
      "service": this.service, "orientation": orientation, "functions": this.currentPreference.functions,
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
        this.parseFunctionsData(res.data[0].list);
        //this.functionsData = res.data[0].list;
      }
    });
  }
  parseFunctionsData(list: any[]) {
    this.functionsData = list.map(column => {
      if (column !== 'TOTAL') {
        column = column + '-SUM';
      }
      return column;
    })
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
          let exits = this.currentPreference.functions.findIndex(x => x.column !== 'TOTAL');
          if (exits === -1) {
            this.currentPreference.functions.push(data);
          } else {
            this.currentPreference.functions[exits] = data;
          }
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

  dropColumns(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsData, event.previousIndex, event.currentIndex);
    this.updateColumnStyleSort();
  }

  dropGroups(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToGroupData, event.previousIndex, event.currentIndex)
    this.updateColumnToGroupSort();
  }

  updateColumnStyleSort() {
    this.currentPreference.columnsStyle.sort((a: OReportColumnsStyle, b: OReportColumnsStyle) => {
      let indexA = this.columnsData.findIndex(x => x.id === a.id);
      let indexB = this.columnsData.findIndex(x => x.id === b.id);
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
      "subtitle": this.currentPreference.subtitle, "columnsStyle": this.currentPreference.columnsStyle
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
      "subtitle": this.currentPreference.subtitle, "columnsStyle": this.currentPreference.columnsStyle
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
    if (!event.option.selected) return;
    let columnSelectedToGroup = event.option.value;
    let columnStyleSelected: OReportColumnsStyle = { id: columnSelectedToGroup, name: this.translateService.get(columnSelectedToGroup), width: 85, alignment: 'left' };

    if (event.option.selected &&
      this.currentPreference.columnsStyle.findIndex(x => x.id === columnSelectedToGroup) === -1) {
      this.currentPreference.columnsStyle.push(columnStyleSelected);
    }
  }

  isCheckedColumn(column) {
    return this.currentPreference.columnsStyle.length > 0 ? this.currentPreference.columnsStyle.filter(x => x.id === column.id).length > 0 : false;
  }


  private parseStringToArray(data): string[] {
    return data.replace("[", "").replace("]", "").split(',');
  }

}