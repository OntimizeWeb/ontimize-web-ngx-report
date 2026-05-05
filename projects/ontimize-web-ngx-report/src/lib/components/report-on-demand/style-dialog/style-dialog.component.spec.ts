import { Injector } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OReportModule } from './../../../ontimize-web-ngx-report.module';
import { OntimizeWebModule, APP_CONFIG, AppConfig, appConfigFactory, ONTIMIZE_PROVIDERS } from 'ontimize-web-ngx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleDialogComponent } from './style-dialog.component';

describe('StyleDialogComponent', () => {
  let component: StyleDialogComponent;
  let fixture: ComponentFixture<StyleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OntimizeWebModule,
        OReportModule,
        NoopAnimationsModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: APP_CONFIG, useValue: {
            uuid: 'com.ontimize.web.test',
            title: 'Ontimize Web Testing',
            locale: 'en'
          }
        },
        { provide: AppConfig, useFactory: appConfigFactory, deps: [Injector] },
        ...ONTIMIZE_PROVIDERS,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            id: 'mycol',
            name: 'My column',
            width: 85,
            alignment: 'center'
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
