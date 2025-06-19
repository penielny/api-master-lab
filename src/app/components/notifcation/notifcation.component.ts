import { Component, effect, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AlertData } from '../../interfaces/alert';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notifcation',
  imports: [NgClass],
  templateUrl: './notifcation.component.html',
  styleUrl: './notifcation.component.scss'
})
export class NotifcationComponent {

  isDisplay: boolean = false;
  alertData: AlertData | undefined;

  constructor(private alertService: AlertService) {
    effect(() => {
      this.isDisplay = this.alertService.isAlerted()
      this.alertData = this.alertService.alert()
    });

  }




  close() {
    this.alertService.clearAlert()
  }

}
