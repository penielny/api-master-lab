import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../interfaces/posts';
import { Router } from '@angular/router';
import { checkProfaneWordsValidator } from '../../extendables/ProfanityValidator';

@Component({
  selector: 'app-post-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit, OnChanges {
  postForm!: FormGroup;
  @Input() post!: Post;
  @Output() formSubmitted = new EventEmitter<Omit<Post, 'id' | 'userId'>>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && !changes['post'].firstChange) {
      this.updateForm();
    }
  }

  private initForm(): void {
    this.postForm = this.fb.group({
      title: [this.post?.title || '', [Validators.required, Validators.minLength(5),checkProfaneWordsValidator()]],
      body: [this.post?.body || '', [Validators.required, Validators.minLength(20),checkProfaneWordsValidator()]],
    });
  }

  private updateForm(): void {
    if (this.postForm) {
      this.postForm.patchValue({
        title: this.post?.title || '',
        body: this.post?.body || '',
      });
    }
  }


  get title() {
    return this.postForm.get('title');
  }

  get body() {
    return this.postForm.get('body');
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const value_ = this.postForm.value
      this.formSubmitted.emit(value_)
      this.postForm.reset()

    } else {
      this.postForm.markAllAsTouched()
    }
  }


  onGoback() {
    if (this.post) {
      this.router.navigate([`/post/${this.post.id}`]);
    } else {
      this.router.navigate(["/"])
    }
  }
}