import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import _ from 'lodash';
import { HeroCardComponent } from "../../components/hero-card/hero-card.component";
import { PaginationCardComponent } from '../../components/pagination-card/pagination-card.component';

@Component({
  selector: 'app-posts',
  imports: [NewsCardComponent, HeroCardComponent,HeroCardComponent,PaginationCardComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  posts: Post[][] = []
  jsonPlaceholderClient = inject(JSONPlaceholderClientService)
  page: number = 1;
  totalPages: number = 1;
  heroPost!: Post;

  constructor() { }

  ngOnInit(): void {
    this.jsonPlaceholderClient.getPosts().subscribe({
      next: (data: Post[]) => {
        const chunckedlist = _.chunk(data, 9)
        this.heroPost = chunckedlist[0][0]
        this.totalPages = chunckedlist.length
        chunckedlist[this.page].shift();
        this.posts = chunckedlist
      },
      error: (err) => {
        console.error(err)
      },
    })
  }

}
