import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-preferences-dialog',
  templateUrl: './save-preferences-dialog.component.html',
  styleUrls: ['./save-preferences-dialog.component.css']
})
export class SavePreferencesDialogComponent implements OnInit {
  name: String;
  constructor(
    public dialogo: MatDialogRef<SavePreferencesDialogComponent>) { }

  ngOnInit() {
  }
  confirmado(): void {
    if (this.name.length == 0) {
      alert();
    }
    else {
      this.dialogo.close(this.name);
    }
  }
}
