import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OntimizeServiceResponse, OntimizeServiceResponseAdapter } from 'ontimize-web-ngx';

import { OReportMappingUtils } from '../util/ReportMappingUtils';

@Injectable()
export class OReportResponseAdapter implements OntimizeServiceResponseAdapter {

  context: any;


  adapt(res: HttpResponse<any>): OntimizeServiceResponse {

    if (res.body?.data) {
      res.body.data = OReportMappingUtils.standarDataMapping(res.body.data);
    }

    if (res.body.sqlTypes) {
      res.body.sqlTypes = OReportMappingUtils.standarDataMapping(res.body.sqlTypes);
    }

    return new OntimizeServiceResponse(
      res.body.code,
      res.body.data,
      res.body.message,
      res.body.sqlTypes,
      res.body.startRecordIndex,
      res.body.totalQueryRecordsNumber
    );
  }

  adaptError(error: HttpErrorResponse): HttpErrorResponse {
    return error;
  }



}
