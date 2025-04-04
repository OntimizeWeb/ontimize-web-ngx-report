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
  ) {

    // this.translate.onLanguageChanged.subscribe((lang) => {
    //   console.log('onTranslationChange', event);
    //   this.loadTranslations();
    // });
  }

  loadTranslations() {
    console.log('loadTranslations report  ');
    Object.keys(MAP).forEach(lang => {
      this.translate.getNgxTranslateService().setTranslation(lang, MAP[this.translate.getCurrentLang()], true); // `true` => merge
    });

    // console.log('loadTranslations report  ');
    // const lang = this.translate.getCurrentLang();
    // console.log('antes ', this.translate.getNgxTranslateService().translations);
    // this.translate.getNgxTranslateService().setTranslation(lang, MAP[this.translate.getCurrentLang()], true); // `true` => merg
    // console.log('despues ', this.translate.getNgxTranslateService().translations);

  }

  getTranslations() {
    return MAP;
  }

}
