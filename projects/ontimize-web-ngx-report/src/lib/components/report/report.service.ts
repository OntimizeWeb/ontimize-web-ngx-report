import { Injectable, Injector } from "@angular/core";
import { Observable, OntimizeEEService, Util } from 'ontimize-web-ngx';
import { ReportResponseAdapter } from './report.response-adapter';

@Injectable()
export class ReportService extends OntimizeEEService {

  constructor(protected injector: Injector) {
    super(injector);
  }

  public advancedQuery(kv?: Object, av?: Array<string>, entity?: string, sqltypes?: Object, offset?: number, pagesize?: number, orderby?: Array<Object>): Observable<any> {
    offset = (Util.isDefined(offset)) ? offset : this.offset;

    // Calculate page
    let page = 0;
    if (Util.isDefined(offset)) {
      page = Math.trunc(offset / 10) + 1;
    }

    let url = 'http://localhost:33333/reportstore/' + entity + '/?format=json' + '&page=' + page;;

    return this.doRequest({
      method: 'GET',
      url: url
    });
  }

  public query(kv?: Object, av?: Array<string>, entity?: string, sqltypes?: Object): Observable<any> {
    const identifier = kv['id'];
    let url = '';
    if (Object.keys(kv).length === 0) {
      url = 'http://localhost:33333/reportstore/' + entity;
    } else {
      url = 'http://localhost:33333/reportstore/' + entity + '/' + identifier;
    }

    return this.doRequest({
      method: 'GET',
      url: url
    });
  }

  public insert(av?: Array<string>, entity?: string, sqltypes?: Object): Observable<any> {
    let url = 'http://localhost:33333/reportstore/' + entity;

    return this.doRequest({
      method: 'POST',
      url: url
    });
  }

  public fillReport(av?: Array<string>, entity?: string, sqltypes?: Object): Observable<any> {
    const identifier = av[0];
    let params = '';
    for (let i = 1; i < av.length; i++)
      params = params + av[i].toString() + ',';
    let body = JSON.stringify({
      params : params
    })
    let url = 'http://localhost:33333/reportstore/' + entity + '/' + identifier;

    return this.doRequest({
      method: 'POST',
      url: url,
      body: body
    });
  }

  public delete(kv?: Object, entity?: string, sqltypes?: Object): Observable<any> {
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = 'http://localhost:33333/reportstore/removeReport/' + identifier;

    return this.doRequest({
      method: 'DELETE',
      url: url
    });
  }

  public update(kv?: Object, av?: Array<string>, entity?: string, sqltypes?: Object): Observable<any> {
    const identifier = kv.valueOf()[Object.keys(kv)[0]];
    let url = 'http://localhost:33333/reportstore/updateReport/' + identifier;

    return this.doRequest({
      method: 'PUT',
      url: url,
      body: av
    });
  }

  public configureAdapter() {
    this.adapter = this.injector.get(ReportResponseAdapter);
  }

}
