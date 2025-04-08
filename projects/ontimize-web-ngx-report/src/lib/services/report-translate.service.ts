import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { OTranslateService } from 'ontimize-web-ngx';

import { MAP } from '../i18n/i18n';

@Injectable({
  providedIn: 'root'
})
export class ReportTranslateService {

  constructor(
    public translate: OTranslateService
  ) {  }

  loadTranslations() {
    Object.keys(MAP).forEach(lang => {
      this.translate.getNgxTranslateService().setTranslation(lang, MAP[this.translate.getCurrentLang()], true); // `true` => merge
    });
  }

  getTranslations() {
    return MAP;
  }

}
