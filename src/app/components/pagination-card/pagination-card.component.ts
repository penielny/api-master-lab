import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-card',
  imports: [NgIf],
  templateUrl: './pagination-card.component.html',
  styleUrl: './pagination-card.component.scss'
})
export class PaginationCardComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;

  goToPage(page: number | string) {

  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  get displayedPages(): (number | string)[] {
  const pages: (number | string)[] = [];
  const total = this.totalPages;
  const current = this.currentPage;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  if (current > 4) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 3) pages.push('...');

  pages.push(total);

  return pages;
}

}
