import { Component, effect, inject, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import _ from 'lodash';
import { HeroCardComponent } from "../../components/hero-card/hero-card.component";
import { PaginationCardComponent } from '../../components/pagination-card/pagination-card.component';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  imports: [NewsCardComponent, HeroCardComponent, HeroCardComponent, PaginationCardComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  heroPost!: Post;
  posts: Post[] = []
  jsonPlaceholderClient = inject(JSONPlaceholderClientService)
  postService = inject(PostsService)

  constructor() {
    effect(() => {

      let post_ = this.postService.posts()
      if (post_.length > 0) {
        this.heroPost = post_[0]
        this.posts = post_.slice(1, post_.length - 1)
      } else {
        this.heroPost = undefined as any;
        this.posts = [];
      }

    })

  }

  ngOnInit(): void {
  
  }

}
