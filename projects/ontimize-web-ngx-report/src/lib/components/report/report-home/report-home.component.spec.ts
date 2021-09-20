import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReportHomeComponent } from "./report-home.component";

describe('ReportComponent', () => {
  let component: ReportHomeComponent;
  let fixture: ComponentFixture<ReportHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
