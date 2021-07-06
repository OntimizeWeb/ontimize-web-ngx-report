import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {

  // Observable string
  private alertSource = new Subject<string>();

  // Observable string streams
  alert$ = this.alertSource.asObservable();

  // Service message commands
  announceAlert(alert: string) {
    this.alertSource.next(alert);
  }

}
