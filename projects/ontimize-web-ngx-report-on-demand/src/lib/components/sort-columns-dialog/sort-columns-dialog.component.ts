import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sort-columns-dialog',
  templateUrl: './sort-columns-dialog.component.html',
  styleUrls: ['./sort-columns-dialog.component.css']
})
export class SortColumnsDialogComponent implements OnInit {
  obj;
  indice;
  proVal;
  proTex;
  ordersData = this.mensaje;
  sortedColumns = [];
  constructor(
    public dialogo: MatDialogRef<SortColumnsDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public mensaje: String) { }
  ngOnInit() {
  }
  arriba() {
    this.obj = document.getElementById('sel');
    this.indice = this.obj.selectedIndex;
    if (this.indice > 0) this.cambiar(this.obj, this.indice, this.indice - 1);
  }
  abajo() {
    this.obj = document.getElementById('sel');
    this.indice = this.obj.selectedIndex;
    if (this.indice != -1 && this.indice < this.obj.length - 1)
      this.cambiar(this.obj, this.indice, this.indice + 1);
  }
  cambiar(obj, num1, num2) {
    this.proVal = obj.options[num1].value;
    this.proTex = obj.options[num1].text;
    obj.options[num1].value = obj.options[num2].value;
    obj.options[num1].text = obj.options[num2].text;
    obj.options[num2].value = this.proVal;
    obj.options[num2].text = this.proTex;
    obj.selectedIndex = num2;
    var x = [];
    for (var i = 0; i < obj.options.length; i++) {
      console.log(obj.options[i].outerText);
      x.push(obj.options[i].outerText);
    }
    this.sortedColumns = x;
    console.log(this.sortedColumns);
    x = [];
  }
  confirmado(): void {
    this.dialogo.close(this.sortedColumns);
  }
}
