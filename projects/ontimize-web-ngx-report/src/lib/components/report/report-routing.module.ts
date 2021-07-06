import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportDetailComponent } from "./report-detail/report-detail.component";
import { ReportFillComponent } from "./report-fill/report-fill.component";
import { ReportNewComponent } from "./report-new/report-new.component";
import { ReportComponent } from "./report.component";

const routes: Routes = [{
  path: '',
  component: ReportComponent
},{
  path: 'new',
  component: ReportNewComponent
},{
  path: ':id',
  component: ReportDetailComponent
},{
  path: ':id/fill',
  component: ReportFillComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
