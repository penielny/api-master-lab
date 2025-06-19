import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsListComponent } from "../../components/comments-list/comments-list.component";
import { UnsplashService } from '../../services/unsplash.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Authentication } from '../../interfaces/auth';
import { DeleteModalComponent } from "../../components/delete-modal/delete-modal.component";

@Component({
  selector: 'app-post-info',
  imports: [CommentsListComponent, DeleteModalComponent],
  templateUrl: './post-info.component.html',
  styleUrl: './post-info.component.scss'
})
export class PostInfoComponent implements OnInit {
  post!: Post;
  isAuthenticated!: Boolean;
  imageCover: string = "https://images.unsplash.com/photo-1621274283140-e4450435a76a?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  jsonPlaceholderClient = inject(JSONPlaceholderClientService)
  unsplashService = inject(UnsplashService)
  authService = inject(AuthenticationService)
  constructor(private route: ActivatedRoute, private router: Router) { }

  isDeleteModal: boolean = false;

  onEdit() {
    this.router.navigate([`/post/${this.post.id}/edit`]);
  }
  onDelete() {
    this.isDeleteModal = true;
  }

  closeDeletModal() {
    this.isDeleteModal = false;
  }

  ngOnInit(): void {
    this.authService.authentication$.subscribe({
      next: () => {
        this.isAuthenticated = this.authService.isAuthenticated()
      },
    })

    this.unsplashService.getRandomImage("art").subscribe({
      next: (value) => {
        this.imageCover = value;
      },
      error: (err) => {
        this.imageCover = "https://images.unsplash.com/photo-1621274283140-e4450435a76a?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
    })

    this.route.params.subscribe({
      next: (value) => {
        this.jsonPlaceholderClient.getPost(value?.['id']).subscribe({
          next: (data: Post) => {
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
