import { ReportRoutingModule } from './components/report/report-routing.module';
import { ReportModule } from './components/report/report.module';

export * from './components/report/report.component';

export const OREPORT_MODULES: any = [
  ReportModule,
  ReportRoutingModule
];
