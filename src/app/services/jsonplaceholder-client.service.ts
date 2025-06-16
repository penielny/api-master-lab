import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Post } from '../interfaces/posts';

@Injectable({
  providedIn: 'root'
})
export class JSONPlaceholderClientService {
  httpClient: HttpClient = inject(HttpClient)
  BASE_URL = `https://jsonplaceholder.typicode.com`;

  constructor() { }

  getPosts() {
    return this.httpClient.get<Post[]>(`${this.BASE_URL}/posts`)
  }

  getPost(id: string) {

    return this.httpClient.get(`${this.BASE_URL}/posts/${id}`).pipe(
      catchError(error => {
        throw error;
      })
    )

  }
  getPostComments(id: string) {

    return this.httpClient.get(`${this.BASE_URL}/posts/${id}/comments`).pipe(
      catchError(error => {
        throw error;
      })
    )

  }

  createPost(body: Post) {
    return this.httpClient.post(`${this.BASE_URL}/posts`, body).pipe(
      catchError(error => {
        throw error;
      })
    )
  }

  deletePostComments(id: string) {

    return this.httpClient.delete(`${this.BASE_URL}/posts/${id}`).pipe(
      catchError(error => {
        throw error;
      })
    )

  }

}
