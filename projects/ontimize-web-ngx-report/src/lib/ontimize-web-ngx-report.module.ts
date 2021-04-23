import { NgModule } from '@angular/core';

import { ODUMMY_MODULES } from './o-components';

export * from './o-components';

@NgModule({
  imports: ODUMMY_MODULES,
  exports: ODUMMY_MODULES
})
export class OReportModule { }
