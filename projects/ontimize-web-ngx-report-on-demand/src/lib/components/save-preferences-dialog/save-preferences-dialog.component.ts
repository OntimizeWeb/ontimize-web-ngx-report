import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-preferences-dialog',
  templateUrl: './save-preferences-dialog.component.html',
  styleUrls: ['./save-preferences-dialog.component.css']
})
export class SavePreferencesDialogComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<SavePreferencesDialogComponent>) { }
  name: String;
  description: String;
  ngOnInit() {
  }
  confirmado(): void {
    this.dialogo.close({ "name": this.name, "description": this.description });
  }
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('')
  });
}
