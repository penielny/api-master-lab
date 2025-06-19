import { Component, inject } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { Post } from '../../interfaces/posts';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-new-post',
  imports: [PostFormComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  jsonlaceholderService = inject(JSONPlaceholderClientService)
  authservice = inject(AuthenticationService)
  postService = inject(PostsService)
  
  constructor(private alert: AlertService) { }
  onCreate(data: Omit<Post, 'id' | 'userId'>) {
    const post: Post = {
      ...data,
      id: Date.now(),
      userId: this.authservice.userInfo()?.user.id as number,
    }
    this.jsonlaceholderService.createPost(post).subscribe({
      next: (value) => {
        this.alert.success("Post created successfully","You successfully created a new post")
      },

      complete:()=> {
        
      },

    })
  }

}
