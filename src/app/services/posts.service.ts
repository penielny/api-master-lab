import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Post } from '../interfaces/posts';
import { JSONPlaceholderClientService } from './jsonplaceholder-client.service';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: WritableSignal<Post[]> = signal([])
  page!: number;

  constructor(private jsonPlaceholderApiService: JSONPlaceholderClientService, private pagination: PaginationService) {

    effect(() => {
      this.page = this.pagination.page();
    })

  }

  getPost() {
    this.jsonPlaceholderApiService.getPosts(this.page).subscribe({
      next: (data: Post[]) => {
        this.posts.set(data);
      },
    })
  }


  addPost(post: Post) {

  }

  updatePost() {

  }

  removePost() {

  }


}
