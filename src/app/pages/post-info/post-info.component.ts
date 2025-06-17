import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-info',
  imports: [],
  templateUrl: './post-info.component.html',
  styleUrl: './post-info.component.scss'
})
export class PostInfoComponent implements OnInit {
  post!: Post;
  jsonPlaceholderClient = inject(JSONPlaceholderClientService)
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe({
      next:(value)=> {
        this.jsonPlaceholderClient.getPost(value?.['id']).subscribe({
          next: (data:Post) => {
           this.post = data;
          },
          error: (err) => {
            console.error('Failed to fetch post', err);
          }
        });
      },
    })
  }

}
