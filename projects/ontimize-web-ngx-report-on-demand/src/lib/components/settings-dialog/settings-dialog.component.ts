import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
  ordersData = [{ value: 'grid', viewValue: 'Dibujar rejilla' }, { value: 'rowNumber', viewValue: 'Incluir números de fila' },
  { value: 'columnName', viewValue: 'Incluir nombres de columnas' }, { value: 'hideGroupDetails', viewValue: 'Ocultar detalles de grupo' }, { value: 'groupNewPage', viewValue: 'Grupo empieza en una página nueva' },
  { value: 'firstGroupNewPage', viewValue: 'Primer grupo empieza en una página nueva' }];
  selectedOptions = [];
  constructor(
    public dialogo: MatDialogRef<SettingsDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public mensaje: String) { }
  ngOnInit() {
  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(this.selectedOptions);
  }

  onAreaListControlChanged(list) {
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
  }
}
