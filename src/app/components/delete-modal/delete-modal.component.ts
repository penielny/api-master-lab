import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import {  Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  @Input() id: number = 0;
  @Output() onClose: EventEmitter<void> = new EventEmitter()
  jsonPlaceholderClient = inject(JSONPlaceholderClientService)

  constructor(private router: Router,private alert:AlertService) { }


  onDelete() {
    this.jsonPlaceholderClient.deletePost(this.id.toString()).subscribe({
      next: (value) => {
        console.log(value)
      },
      complete:()=> {
        this.alert.success("Deleted Success","You successfuly deleted post with id "+this.id)
        this.router.navigate(["/"])
      },
      error(err) {

      },
    })
  }

  onCancel() {
    this.onClose.emit()
  }
}
