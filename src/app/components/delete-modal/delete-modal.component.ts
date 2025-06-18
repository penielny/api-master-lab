import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import {  Router } from '@angular/router';

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

  constructor(private router: Router) { }


  onDelete() {
    this.jsonPlaceholderClient.deletePost(this.id.toString()).subscribe({
      next: (value) => {
        console.log(value)
      },
      complete:()=> {
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
