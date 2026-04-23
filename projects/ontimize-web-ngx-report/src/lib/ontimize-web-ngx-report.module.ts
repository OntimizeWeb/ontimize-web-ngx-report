import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { OREPORT_DECLARATION_MODULES, OREPORT_IMPORTS_MODULES } from './config/o-components';
import { OREPORT_PROVIDERS } from './config/o-providers';
import { ReportTranslateService } from './services/report-translate.service';

@NgModule({
    declarations: OREPORT_DECLARATION_MODULES,
    imports: OREPORT_IMPORTS_MODULES,
    providers: OREPORT_PROVIDERS,
    schemas: [NO_ERRORS_SCHEMA]
})

export class OReportModule {
  constructor(private readonly translationService: ReportTranslateService) {
    this.translationService.loadTranslations();
  }
 }
