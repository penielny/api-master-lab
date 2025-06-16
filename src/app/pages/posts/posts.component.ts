import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  posts: Post[] = []
  jsonPlaceholderClient = inject(JSONPlaceholderClientService)
  constructor() { }

  ngOnInit(): void {
    this.jsonPlaceholderClient.getPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
      },
      error: (err) => {
        console.error(err)
      },
    })
  }

}
