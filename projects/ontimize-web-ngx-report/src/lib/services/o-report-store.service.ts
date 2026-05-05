import { HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, Observable, Util } from 'ontimize-web-ngx';
import { share } from 'rxjs/operators';

import { OReportViewerComponent } from '../components/report/o-report-viewer/o-report-viewer.component';
import { OFilterParameter } from '../types/filter-parameter.type';
import { OReportStoreParam, OReportStoreParamValue } from '../types/report-store-param.type';
import { Utils } from '../util/utils';
import { OReportService } from './o-report.service';
import { OReportMappingUtils } from '../util/report-mapping-utils';

@Injectable()
export class OReportStoreService extends OReportService {
  protected dialogService: DialogService;
  protected dialog: MatDialog
  readonly DEFAULT_PATH = '/reportstore';

  constructor(
    protected injector: Injector
  ) {
    super(injector);
    this.dialogService = this.injector.get<DialogService>(DialogService);
    this.dialog = this.injector.get<MatDialog>(MatDialog);
  }

  configureService(config: any): void {
    super.configureService(config);
    this.path = config.path || this.DEFAULT_PATH;
  }

  public query(kv?: Object, _av?: Array<string>, entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv['REPORTUUID'];
    let url = '';
    if (Object.keys(kv).length === 0) {
      url = `${this.urlBase}${this.path}/listReports`;
    } else {
      url = `${this.urlBase}${this.path}/getReport/` + identifier;
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

    let url = this.urlBase + this.path + '/' + entity + '/?format=json' + '&page=' + page;

    return this.doRequest({
      method: 'GET',
      url: url
    });
  }

  public delete(kv?: Object, _entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = `${this.urlBase}${this.path}/removeReport/` + identifier;

    return this.doRequest({
      method: 'DELETE',
      url: url
    });
  }

  public update(kv?: Object, av?: any, _entity?: string, _sqltypes?: Object): Observable<any> {
    delete av['REPORTID'];
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = `${this.urlBase}${this.path}/updateReport/` + identifier;
    av = OReportMappingUtils.ontimizeDataMapping(av);
    return this.doRequest({
      method: 'PUT',
      url: url,
      body: av
    });
  }

  public fillReport(uuid: string, reportStoreParam: OReportStoreParam, entity?: string, _sqltypes?: Object): Observable<any> {
    let body = JSON.stringify(reportStoreParam);
    let url = `${this.urlBase}${this.path}/${entity}/` + uuid;

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  openFillReport(uuid: string, parametersValues: Array<OReportStoreParamValue> = [], filter: OFilterParameter = { filter: {} }) {
    this.configureService(this.getDefaultServiceConfiguration('reportstore'));
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

      let url = `${this.urlBase}${this.path}/addReport`;

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

      const request = new HttpRequest('POST', url, toUpload, {
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

  protected buildHeadersReport(): HttpHeaders {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    const sessionId = this.authService.getSessionInfo().id;
    if (Util.isDefined(sessionId)) {
      headers = headers.append('Authorization', 'Bearer ' + sessionId);
    }
    return headers;
  }

  protected bodyCode(resp, observer) {
    if (resp.body['code'] === 3) {
      this.authService.logout();
    } else if (resp.body['code'] === 1) {
      observer.error(resp.body['message']);
    } else if (resp.body['code'] === 0) {
      // RESPONSE
      observer.next(resp.body);
    } else {
      // Unknow state -> error
      observer.error('Service unavailable');
    }
  }


}
