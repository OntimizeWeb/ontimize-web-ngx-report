import { Pipe, PipeTransform, Injector } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';
import * as CORE_TRANSLATIONS from '../i18n/i18n';

@Pipe({
  name: 'oReportsTranslate',
  pure: false
})
export class OReportsTranslatePipe implements PipeTransform {

  protected translateService: OTranslateService;

  constructor(protected injector: Injector) {
    this.translateService = this.injector.get(OTranslateService);
  }

  transform(text: string): string {
    let textTranslated = undefined;
    let bundle = CORE_TRANSLATIONS.MAP[this.translateService.getCurrentLang()];
    if (bundle && bundle[text]) {
      textTranslated = bundle[text];
    } else {
      textTranslated = this.translateService.get(text);
    }
    return textTranslated;
  }

}
