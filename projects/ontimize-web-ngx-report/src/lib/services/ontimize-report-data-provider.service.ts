import { Injectable, Injector } from '@angular/core';

import { OntimizeReportDataBaseProvider } from './ontimize-report-data-base-provider.service';
import { IReportDataProvider } from '../interfaces/report-data-provider.interface';

@Injectable()
export class OntimizeReportDataProvider extends OntimizeReportDataBaseProvider implements IReportDataProvider {

  constructor(
    public injector: Injector
  ) {
    super(injector)
  }

}
