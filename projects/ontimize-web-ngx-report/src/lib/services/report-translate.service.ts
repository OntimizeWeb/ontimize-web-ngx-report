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
    if (!ReportTranslateService.initialized) {
      this.loadTranslations();
      ReportTranslateService.initialized = true;
    }
  }

  loadTranslations() {
    Object.keys(MAP).forEach(lang => {
      this.translate.getNgxTranslateService().setTranslation(lang, MAP[this.translate.getCurrentLang()], true); // `true` => merge
    });
  }



}
