import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-save-preferences-dialog',
  templateUrl: './save-preferences-dialog.component.html'
})
export class SavePreferencesDialogComponent {
  public formGroup: FormGroup
  public name: string;
  public description: string;

  constructor(
    public dialogo: MatDialogRef<SavePreferencesDialogComponent>) {
    this.initialize();
  }

  initialize() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('')
    });
  }

  save(): void {
    this.dialogo.close({ "name": this.name, "description": this.description });
  }
}
