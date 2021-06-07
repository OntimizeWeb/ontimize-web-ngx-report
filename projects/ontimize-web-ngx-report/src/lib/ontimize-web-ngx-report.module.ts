import { NgModule } from '@angular/core';

import { ODUMMY_MODULES } from './o-components';
import { OREPORT_MODULES } from './o-components';

export * from './o-components';

@NgModule({
  imports: [
    ODUMMY_MODULES,
    OREPORT_MODULES
  ],
  exports: [
    ODUMMY_MODULES,
    OREPORT_MODULES
  ]
})
export class OReportModule { }
