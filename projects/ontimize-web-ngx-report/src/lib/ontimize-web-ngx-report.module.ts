import { NgModule } from '@angular/core';

import { OREPORT_MODULES } from './o-components';

export * from './o-components';

@NgModule({
  imports: [
    OREPORT_MODULES
  ],
  exports: [
    OREPORT_MODULES
  ]
})
export class OReportModule { }
