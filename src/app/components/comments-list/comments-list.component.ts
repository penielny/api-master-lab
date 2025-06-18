import { Component, inject, Input, OnInit } from '@angular/core';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import { Comment } from '../../interfaces/comments';
import { CommentCardComponent } from '../comment-card/comment-card.component';
@Component({
  selector: 'app-comments-list',
  imports: [CommentCardComponent],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss'
})
export class CommentsListComponent implements OnInit {
  @Input() id!: number;
  comments :Comment[] = [];

  jsonPlaceholderClient = inject(JSONPlaceholderClientService)

  ngOnInit(): void {
    this.jsonPlaceholderClient.getPostComments(this.id).subscribe({
      next:(value)=> {
          this.comments = value
      },
    })
  }
}
