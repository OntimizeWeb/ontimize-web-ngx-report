import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogService, OFileInputComponent, OFormComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert.service';

@Component({
  selector: 'o-report-new',
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.css'],
  encapsulation: ViewEncapsulation.None,
  host:{
    '[class.app-report-store-new]' : 'true'
  }
})
export class ReportNewComponent implements OnInit {

  @ViewChild('name', { static: true })
  name: OTextInputComponent;
  @ViewChild('type', { static: true })
  type: OTextInputComponent;
  @ViewChild('description', { static: true })
  description: OTextInputComponent;
  @ViewChild('form', { static: true })
  form: OFormComponent;

  subscription: Subscription;

  constructor(
    private alertService: AlertService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }

  getFileData() {
    let data = {
      'name': this.name.getValue(),
      'type': this.type.getValue(),
      'description': this.description.getValue(),
    };
    return data;
  }

  onUploadFile(e: Event) {
    this.confirm();
    this.form.confirmExit = false;
    this.form.closeDetail();
  }

  onError(e: Event) {
    if (this.dialogService) {
      this.dialogService.error('Server Error',
        'Sorry, something went wrong.');
    }
  }

  confirm() {
    this.alertService.announceAlert('alert');
  }

}
