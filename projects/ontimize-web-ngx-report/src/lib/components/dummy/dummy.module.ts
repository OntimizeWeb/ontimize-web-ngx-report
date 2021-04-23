import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DummyComponent } from './dummy.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DummyComponent],
  exports: [DummyComponent]
})
export class DummyModule { }
