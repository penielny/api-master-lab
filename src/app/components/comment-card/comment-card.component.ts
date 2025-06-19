import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces/comments';

@Component({
  selector: 'app-comment-card',
  imports: [],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {
@Input() comment!: Comment;
}
