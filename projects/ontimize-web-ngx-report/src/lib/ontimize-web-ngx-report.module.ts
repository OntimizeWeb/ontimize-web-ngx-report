import { NgModule } from "@angular/core";

import { OREPORT_STANDALONE_COMPONENTS } from "./config/o-components";
import { OREPORT_PROVIDERS } from "./config/o-providers";
import { ReportTranslateService } from "./services/report-translate.service";

@NgModule({
  imports: OREPORT_STANDALONE_COMPONENTS,
  exports: OREPORT_STANDALONE_COMPONENTS,
  providers: OREPORT_PROVIDERS,
})
export class OReportModule {
  constructor(private readonly translationService: ReportTranslateService) {
    this.translationService.loadTranslations();
  }
}
