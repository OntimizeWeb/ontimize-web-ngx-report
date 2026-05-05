import { Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfig, appConfigFactory, APP_CONFIG, OntimizeWebModule, ONTIMIZE_PROVIDERS, OPermissionsModule } from 'ontimize-web-ngx';

import { OReportModule } from '../../../ontimize-web-ngx-report.module';
import { OReportHomeComponent } from './o-report-home.component';

describe('ReportComponent', () => {
  let component: OReportHomeComponent;
  let fixture: ComponentFixture<OReportHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OntimizeWebModule,
        OPermissionsModule,
        NoopAnimationsModule,
        OReportModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: APP_CONFIG, useValue: {
            uuid: 'com.ontimize.web.test',
            title: 'Ontimize Web Testing',
            locale: 'en'
          } },
        { provide: AppConfig, useFactory: appConfigFactory, deps: [Injector] },
        ...ONTIMIZE_PROVIDERS
      ]
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
