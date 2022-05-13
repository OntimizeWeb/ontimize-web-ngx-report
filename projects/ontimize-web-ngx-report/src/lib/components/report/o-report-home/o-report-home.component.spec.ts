import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { OReportHomeComponent } from "./o-report-home.component";

describe('ReportComponent', () => {
  let component: OReportHomeComponent;
  let fixture: ComponentFixture<OReportHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OReportHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OReportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
