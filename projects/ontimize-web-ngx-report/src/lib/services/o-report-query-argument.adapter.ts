import { OntimizeQueryArgumentsAdapter } from 'ontimize-web-ngx';

import { OReportMappingUtils } from '../util/ReportMappingUtils';
import { Injectable } from '@angular/core';

@Injectable()
export class OReportQueryArgumentsAdapter extends OntimizeQueryArgumentsAdapter {

  parseQueryParameters(args: any): any[] {
    args.columns = OReportMappingUtils.ontimizeMappingKeys(args.columns);
    args.sqlTypes = OReportMappingUtils.ontimizeDataMapping(args.sqlTypes);
    return super.parseQueryParameters(args);
  }
}

