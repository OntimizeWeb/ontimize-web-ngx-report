import { NgModule } from '@angular/core';
import { OREPORT_PROVIDERS } from './config/o-providers';
import { OREPORT_DECLARATION_MODULES, OREPORT_ENTRY_COMPONENTS_MODULES, OREPORT_IMPORTS_MODULES } from './config/o-components';

@NgModule({
    declarations: OREPORT_DECLARATION_MODULES,
    imports: OREPORT_IMPORTS_MODULES,
    providers: OREPORT_PROVIDERS
})

export class OReportModule { }
