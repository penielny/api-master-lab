import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import { Post } from '../../interfaces/posts';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-edit-post',
  imports: [PostFormComponent],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit {
  post!: Post;
  constructor(private router:Router, private route: ActivatedRoute, private jsonplaceholderService: JSONPlaceholderClientService, private alert: AlertService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jsonplaceholderService.getPost(id.toString()).subscribe({
        next: (value) => {
          this.post = value;
        },
      })
    }
  }


  onEdit(post: Partial<Post>) {
    const post_: Post = {
      ...this.post,
      ...post
    }
    this.jsonplaceholderService.updatePost(post_).subscribe({
      next: (value) => {
        this.alert.success("Update success","You successfully upadted a new post")
      },
      complete:()=> {
          this.router.navigate(["/post",this.post.id])
      },

    })
  }


}
