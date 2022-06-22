import { HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { IFileService, Observable, OntimizeEEService, Util } from 'ontimize-web-ngx';
import { share } from 'rxjs/operators';

@Injectable()
export class OReportService extends OntimizeEEService implements IFileService {

  constructor(protected injector: Injector) {
    super(injector);
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
  protected buildHeadersReport(): HttpHeaders {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    const sessionId = this.authService.getSessionInfo().id;
    if (Util.isDefined(sessionId)) {
      headers = headers.append('Authorization', 'Bearer ' + sessionId);
    }
    return headers;
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

  public fillReport(av?: Array<string>, entity?: string, _sqltypes?: Object, filter?: Object): Observable<any> {
    const identifier = av[0];
    let params = '';

    for (let i = 1; i < av.length; i++)
      params = params + av[i].toString() + ',';
    let body = JSON.stringify({
      params: params,
      filter: filter
    })

    let url = `${this.urlBase}/reportstore/${entity}/` + identifier;

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
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

  public update(kv?: Object, av?: Array<string>, _entity?: string, _sqltypes?: Object): Observable<any> {
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = `${this.urlBase}/reportstore/updateReport/` + identifier;

    return this.doRequest({
      method: 'PUT',
      url: url,
      body: av
    });
  }


}
