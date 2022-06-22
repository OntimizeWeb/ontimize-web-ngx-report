import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OReportDetailComponent } from "./o-report-detail/o-report-detail.component";
import { OReportNewComponent } from "./o-report-new/o-report-new.component";
import { OReportHomeComponent } from "./o-report-home/o-report-home.component";

const routes: Routes = [{
  path: '',
  component: OReportHomeComponent
},{
  path: 'new',
  component: OReportNewComponent
},{
  path: ':UUID',
  component: OReportDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OReportRoutingModule { }
