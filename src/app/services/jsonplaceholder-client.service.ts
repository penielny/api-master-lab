import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { Post } from '../interfaces/posts';
import { Comment } from '../interfaces/comments';
import { ErrorService } from './error.service';
import { CacheHttpService } from '../extendables/CacheHttpClient';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JSONPlaceholderClientService {
  httpClient: HttpClient = inject(HttpClient)
  errorService: ErrorService = inject(ErrorService)

  BASE_URL = environment.jsonBaseUrl;

  constructor(private cacheHttpClient: CacheHttpService) { }

  getPosts(page?: number, limit: number = 10) {
    return this.cacheHttpClient.get<Post[]>(`${this.BASE_URL}/posts?_page=${page}&_limit=${limit}`, 1000 * 60).pipe(
      retry(2),
      catchError(error => {
        this.errorService.handleError(error);
        throw error;
      })
    )
  }

  getPost(id: string) {

    return this.cacheHttpClient.get<Post>(`${this.BASE_URL}/posts/${id}`).pipe(
      retry(2),
      catchError(error => {
        this.errorService.handleError(error);
        throw error;
      })
    )

  }
  getPostComments(id: number) {

    return this.cacheHttpClient.get<Comment[]>(`${this.BASE_URL}/posts/${id}/comments`).pipe(
      retry(2),
      catchError(error => {
        this.errorService.handleError(error);
        throw error;
      })
    )

  }

  createPost(body: Post) {
    return this.httpClient.post(`${this.BASE_URL}/posts`, body).pipe(
      retry(2),
      catchError(error => {
        this.errorService.handleError(error);
        throw error;
      })
    )
  }
  updatePost(body: Post) {
    return this.httpClient.put(`${this.BASE_URL}/posts/${body.id}`, body).pipe(
      retry(2),
      catchError(error => {
        this.errorService.handleError(error);
        throw error;
      })
    )
  }

  deletePost(id: string) {

    return this.httpClient.delete(`${this.BASE_URL}/posts/${id}`).pipe(
      retry(2),
      catchError(error => {
        this.errorService.handleError(error);
        throw error;
      })
    )

  }

}
