import { Component } from "@angular/core";

@Component({
  selector: 'o-report-skeleton',
  templateUrl: './o-report-skeleton.component.html',
  styleUrls: ['./o-report-skeleton.component.scss'],
  host: {
    '[class.o-report-skeleton]': 'true'
  }
})
export class OReportSkeletonComponent { }