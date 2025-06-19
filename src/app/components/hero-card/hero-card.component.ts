import { Component, inject, Input } from '@angular/core';
import { Post } from '../../interfaces/posts';
import { UnsplashService } from '../../services/unsplash.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  imports: [RouterLink],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  @Input() post!:Post;

  imageCover:string = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
  unsplashService = inject(UnsplashService)

  ngOnInit(): void {
    this.unsplashService.getRandomImage("developer").subscribe({
      next : (value) =>{
        this.imageCover = value;
      },
      error:(err)=> {
        this.imageCover = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
      },
    })
    
  }
}
