import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogService, OFileInputComponent, OFormComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';
import { OAlertService } from '../../../services/o-alert.service';

@Component({
  selector: 'o-report-new',
  templateUrl: './o-report-new.component.html',
  styleUrls: ['./o-report-new.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.app-report-store-new]': 'true'
  }
})
export class OReportNewComponent {

  @ViewChild('name', { static: true })
  name: OTextInputComponent;
  @ViewChild('type', { static: true })
  type: OTextInputComponent;
  @ViewChild('description', { static: true })
  description: OTextInputComponent;
  @ViewChild('form', { static: true })
  form: OFormComponent;
  @ViewChild('file', { static: true })
  file: OFileInputComponent;

  subscription: Subscription;
  loading: boolean = false;

  constructor(
    private alertService: OAlertService,
    private dialogService: DialogService
  ) { }

  getFileData() {
    return {
      'name': this.name.getValue(),
      'type': this.type.getValue(),
      'description': this.description.getValue(),
    };
  }

  onUploadFile() {
    this.loading = false;
    this.confirm();
    this.form._clearAndCloseFormAfterInsert();
  }

  onError() {
    if (this.dialogService) {
      this.dialogService.error('ERROR',
        'SERVER_ERROR_MESSAGE');
      this.loading = false;
    }
  }

  confirm() {
    this.alertService.announceAlert('alert');
  }

  onClickSave(e: Event) {
    Object.keys(this.form.formGroup.controls).forEach((control) => {
      this.form.formGroup.controls[control].markAsTouched();
    });

    if (!this.form.formGroup.valid) {
      this.dialogService.alert('ERROR', 'MESSAGES.FORM_VALIDATION_ERROR');
      return;
    }
    this.loading = true;
    this.file.onClickUpload(e);
  }

}
