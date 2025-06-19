import { NgIf } from '@angular/common';
import { Component, effect, Input, OnInit } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { JSONPlaceholderClientService } from '../../services/jsonplaceholder-client.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-pagination-card',
  imports: [],
  templateUrl: './pagination-card.component.html',
  styleUrl: './pagination-card.component.scss'
})
export class PaginationCardComponent  {

  currentPage!: number;
  totalPages!: number;

  constructor(private postService:PostsService ,private pagination: PaginationService, private jsonService: JSONPlaceholderClientService) {

    effect(() => {
      this.postService.getPost()
      this.currentPage = this.pagination.page()
      this.totalPages = this.pagination.totalPage()
    })

   }

  next() {
    this.pagination.nextPage()
  }

  prev() {
    this.pagination.prevPage()
  }

  goto(page:number){
    this.pagination.goto(page)
  }

  get totalPagesArray(): number[] {
    console.log(this.totalPages)
    return Array.from({ length: this.totalPages/10 }, (_, i) => i + 1);
  }

}
