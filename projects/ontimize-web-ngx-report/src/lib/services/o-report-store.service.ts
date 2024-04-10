import { Injectable, Injector } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DialogService, Observable, Util } from "ontimize-web-ngx";
import { OReportViewerComponent } from "../components/report/o-report-viewer/o-report-viewer.component";
import { Utils } from "../util/utils";
import { OReportService } from "./o-report.service";
import { HttpEventType, HttpRequest } from "@angular/common/http";
import { share } from 'rxjs/operators';
import { OReportStoreParam, OReportStoreParamValue } from "../types/report-store-param.type";
import { OFilterParameter } from "../types/filter-parameter.type";

@Injectable()
export class OReportStoreService extends OReportService {
  protected dialogService: DialogService;
  protected dialog: MatDialog

  constructor(
    protected injector: Injector
  ) {
    super(injector);
    this.dialogService = this.injector.get<DialogService>(DialogService);
    this.dialog = this.injector.get<MatDialog>(MatDialog);
  }

  public query(kv?: Object, _av?: Array<string>, entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv['UUID'];
    let url = '';
    if (Object.keys(kv).length === 0) {
      url = `${this.urlBase}/reportstore/${entity}`;
    } else {
      url = `${this.urlBase}/reportstore/${entity}/` + identifier;
    }

    return this.doRequest({
      method: 'GET',
      url: url
    });
  }


  public advancedQuery(_kv?: Object, _av?: Array<string>, entity?: string, _sqltypes?: Object, offset?: number, _pagesize?: number, _orderby?: Array<Object>): Observable<any> {
    offset = (Util.isDefined(offset)) ? offset : this.offset;

    // Calculate page
    let page = 0;
    if (Util.isDefined(offset)) {
      page = Math.trunc(offset / 10) + 1;
    }

    let url = this.urlBase + '/reportstore/' + entity + '/?format=json' + '&page=' + page;

    return this.doRequest({
      method: 'GET',
      url: url
    });
  }

  public delete(kv?: Object, _entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = `${this.urlBase}/reportstore/removeReport/` + identifier;

    return this.doRequest({
      method: 'DELETE',
      url: url
    });
  }

  public update(kv?: Object, av?: any, _entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = `${this.urlBase}/reportstore/updateReport/` + identifier;

    return this.doRequest({
      method: 'PUT',
      url: url,
      body: av
    });
  }

  public fillReport(uuid: string, reportStoreParam: OReportStoreParam, entity?: string, _sqltypes?: Object): Observable<any> {
    let body = JSON.stringify(reportStoreParam);
    let url = `${this.urlBase}/reportstore/${entity}/` + uuid;

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  openFillReport(uuid: string, parametersValues: Array<OReportStoreParamValue> = [], filter: OFilterParameter = { filter: {} }) {
    this.configureService(this.getDefaultServiceConfiguration());
    this.configureAdapter();
    let kv = { 'UUID': uuid };
    this.query(kv, null, 'getReport', {}).subscribe(
      res => {
        if (res && res.data.length && res.code === 0) {
          let name = res.data[0].NAME;

          const reportStoreParam: OReportStoreParam = {
            filters: filter,
            parameters: parametersValues
          }
          const data = {
            'id': uuid,
            'name': name,
            'param': reportStoreParam
          };
          Utils.openModalVisor(this.dialog, OReportViewerComponent, data)

        }
      },
      err => {
        if (this.dialogService) {
          this.dialogService.error('ERROR',
            'SERVER_ERROR_MESSAGE');
        }
        console.log(err);
      }
    );

  }

  upload(files: any[], entity: string, data?: object): Observable<any> {
    const dataObservable = new Observable(observer => {

      let url = `${this.urlBase}/reportstore/${entity}`;

      const toUpload: any = new FormData();
      files.forEach(item => {
        item.prepareToUpload();
        item.isUploading = true;
        toUpload.append('name', item.name);
        toUpload.append('file', item.file);
      });

      if (data) {
        toUpload.append('data', JSON.stringify(data));
      }
      let method = entity === 'addReport' ? 'POST' : 'PUT';


      const request = new HttpRequest(method, url, toUpload, {
        headers: this.buildHeadersReport(),
        reportProgress: true
      });

      this.httpClient.request(request).subscribe(resp => {
        if (HttpEventType.UploadProgress === resp.type) {
          // Upload progress event received
          const progressData = {
            loaded: resp.loaded,
            total: resp.total
          };
          observer.next(progressData);
        } else if (HttpEventType.Response === resp.type) {
          // Full response received
          if (resp.body) {
            this.bodyCode(resp, observer);
          } else {
            observer.next(resp.body);
          }
        }
      }, error => {
        console.error(error);
        if (error.status === 401) {
          this.authService.logout();
        } else {
          observer.error(error);
        }
      },
        () => observer.complete());
    });
    return dataObservable.pipe(share());
  }


}