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

  imageCover:string = "https://images.unsplash.com/photo-1621274283140-e4450435a76a?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  unsplashService = inject(UnsplashService)

  ngOnInit(): void {
    this.unsplashService.getRandomImage("developer").subscribe({
      next : (value) =>{
        console.log(value)
        this.imageCover = value;
      },
      error:(err)=> {
        this.imageCover = "https://images.unsplash.com/photo-1621274283140-e4450435a76a?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
    })
    
  }
}
