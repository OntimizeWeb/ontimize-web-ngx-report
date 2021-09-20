import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportDetailComponent } from "./report-detail/report-detail.component";
import { ReportNewComponent } from "./report-new/report-new.component";
import { ReportHomeComponent } from "./report-home/report-home.component";

const routes: Routes = [{
  path: '',
  component: ReportHomeComponent
},{
  path: 'new',
  component: ReportNewComponent
},{
  path: ':UUID',
  component: ReportDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
