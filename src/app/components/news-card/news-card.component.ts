import { Component, inject, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts';
import { RouterLink } from '@angular/router';
import { UnsplashService } from '../../services/unsplash.service';

@Component({
  selector: 'app-news-card',
  imports: [RouterLink],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent implements OnInit {
  @Input() post!: Post;
  imageCover:string = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
  unsplashService = inject(UnsplashService)

  ngOnInit(): void {
    this.unsplashService.getRandomImage().subscribe({
      next : (value) =>{
        this.imageCover = value;
      },
      error:(err)=> {
        this.imageCover = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
      },
    })
    
  }

}
