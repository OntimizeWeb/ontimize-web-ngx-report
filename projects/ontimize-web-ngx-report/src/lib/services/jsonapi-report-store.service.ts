import { HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, Observable, Util } from 'ontimize-web-ngx';
import { JSONAPIResponse } from 'ontimize-web-ngx/lib/interfaces/jsonapi-response.interface';
import { share } from 'rxjs/operators';

import { OReportStoreParam, OReportStoreParamValue } from '../types/report-store-param.type';
import { Utils } from '../util/utils';
import { JSONAPIReportService } from './jsonapi-report.service';
import { OFilterParameter } from '../types/filter-parameter.type';
import { JSONAPIQueryParameter } from 'ontimize-web-ngx/lib/types/json-query-parameter.type';
import { OReportViewerComponent } from '../components/report/o-report-viewer/o-report-viewer.component';

@Injectable()
export class JSONAPIReportStoreService extends JSONAPIReportService {
  protected dialogService: DialogService;
  protected dialog: MatDialog;
  readonly DEFAULT_PATH = '/reportstore';

  constructor(
    protected injector: Injector
  ) {
    super(injector);
    this.dialogService = this.injector.get<DialogService>(DialogService);
    this.dialog = this.injector.get<MatDialog>(MatDialog);
  }

  public configureService(config: any): void {
    super.configureService(config);
    this._startSessionPath = this._appConfig.startSessionPath ? this._appConfig.startSessionPath : '/auth/login';
    this.path = config.path || this.DEFAULT_PATH;
  }

  public fillReport(uuid: string, reportStoreParam: OReportStoreParam, entity?: string, _sqltypes?: Object): Observable<any> {
    let body = JSON.stringify(reportStoreParam);
    entity = this.getStandartEntity(entity);

    let url = `${this.urlBase}${this.path}/${entity}/` + uuid;

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  update(kv: object, av: object, entity?: string, sqltypes?: object): Observable<JSONAPIResponse> {
    entity = this.getStandartEntity(entity);
    /**Replace key UUID by REPORTID */
    // kv = { 'REPORTID': av['REPORTID'] };
    // delete av['REPORTID'];
    return super.update(kv, av, entity);
  }

  openFillReport(uuid: string, parametersValues: Array<OReportStoreParamValue> = [], filter: OFilterParameter = { filter: {} }) {
    this.configureService(this.getDefaultServiceConfiguration('reportstore'));
    this.configureAdapter();
    this.path = `${this.path}/getReport`;
    let queryParams: JSONAPIQueryParameter = {
      filter: { 'REPORTUUID': uuid }
    };
    this.query(queryParams).subscribe({

      next: (res: JSONAPIResponse) => {
        if (Util.isArray(res) && res.isSuccessful()) {
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
      error: (err) => {
        if (this.dialogService) {
          this.dialogService.error('ERROR',
            'SERVER_ERROR_MESSAGE');
        }
        console.log(err);
      }
    });

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
