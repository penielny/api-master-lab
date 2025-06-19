import { Injectable, signal, WritableSignal } from '@angular/core';
import { JSONPlaceholderClientService } from './jsonplaceholder-client.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  page: WritableSignal<number> = signal(1)
  totalPage: WritableSignal<number> = signal(1)


 nextPage() {
    this.page.update(current => {
      if (current < this.totalPage()) {
        return current + 1;
      }
      return current;
    });
  }

  prevPage() {
    this.page.update(current => {
      if (current > 1) {
        return current - 1;
      }
      return current;
    });
  }

  goto(page: number) {
    this.page.set(page)
  }

  setTotalPage(pages: number) {
    this.totalPage.set(pages)
  }

}
