import { Injectable, signal, WritableSignal } from '@angular/core';
import { AlertData } from '../interfaces/alert';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert: WritableSignal<AlertData | undefined> = signal(undefined);
  isAlerted: WritableSignal<boolean> = signal(false);

  constructor() { }

  error(message: string, description?: string) {
    this.alert.set({
      type: 'ERROR',
      message,
      description
    })
    this.isAlerted.set(true);

  }

  success(message: string, description?: string) {
    this.alert.set({
      type: 'SUCCCESS',
      message,
      description
    })
    this.isAlerted.set(true);
  }

  warn(message: string, description?: string) {
    this.alert.set({
      type: 'WARN',
      message,
      description
    })
    this.isAlerted.set(true);
  }

  clearAlert() {
    this.isAlerted.set(false);
    this.alert.set(undefined);
  }

}
