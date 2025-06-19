import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Post } from '../interfaces/posts';
import { JSONPlaceholderClientService } from './jsonplaceholder-client.service';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: WritableSignal<Post[]> = signal([])
  page: number =1;

  constructor(private jsonPlaceholderApiService: JSONPlaceholderClientService, private pagination: PaginationService) {

    effect(() => {
      this.page = this.pagination.page();
    })

    this.getPost()

  }

  getPost() {
    this.jsonPlaceholderApiService.getPosts(this.page).subscribe({
      next: (data: Post[]) => {
        this.posts.set(data);
      },
    })
  }

  addPost(post: Post) {
    this.posts.update(prev => [post, ...prev]);
  }

  updatePost(updatedPost: Post) {
    this.posts.update(prev =>
      prev.map(post => post.id === updatedPost.id ? updatedPost : post)
    );
  }

  removePost(postId: number) {
    this.posts.update(prev =>
      prev.filter(post => post.id !== postId)
    );
  }

}
