import { DummyModule } from './components/dummy/dummy.module';
import { ReportRoutingModule } from './components/report/report-routing.module';
import { ReportModule } from './components/report/report.module';

export * from './components/dummy/dummy.component';
export * from './components/report/report.component';

export const ODUMMY_MODULES: any = [
  DummyModule
];

export const OREPORT_MODULES: any = [
  ReportModule,
  ReportRoutingModule
];
