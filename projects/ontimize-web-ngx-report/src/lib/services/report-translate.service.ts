import { Injectable } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';

import { MAP } from '../i18n/i18n';

@Injectable({
  providedIn: 'root'
})
export class ReportTranslateService {

  private static initialized = false;
  constructor(
    public translate: OTranslateService
  ) {
    this.translate.onLanguageChanged.subscribe((event: Event) => {
      ReportTranslateService.initialized = false;
      this.loadTranslations();
    });

    if (!ReportTranslateService.initialized) {
      this.loadTranslations();
    }
  }

  loadTranslations() {
    if (!ReportTranslateService.initialized) {
      const lang = this.translate.getCurrentLang();
      this.translate.getNgxTranslateService().setTranslation(lang, MAP[lang], true); // `true` => merge
      ReportTranslateService.initialized = true;
    }
  }


}
