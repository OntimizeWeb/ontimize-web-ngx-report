import { Component } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

@Component({
  selector: 'o-report-skeleton',
  templateUrl: './o-report-skeleton.component.html',
  styleUrls: ['./o-report-skeleton.component.scss'],
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  host: {
    '[class.o-report-skeleton]': 'true'
  }
})
export class OReportSkeletonComponent { }