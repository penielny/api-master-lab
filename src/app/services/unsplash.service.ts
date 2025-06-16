import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnsplashService {
    private apiUrl = 'https://api.unsplash.com/photos/random';
    private accessKey = 'S_Iw42O7ZroqNCskyd93yHwPEUXHdfKDKMoMhQwaEdA';

    constructor(private http: HttpClient) { }

    getRandomImage(query?: string): Observable<string> {
        const url = `${this.apiUrl}?client_id=${this.accessKey}${query ? `&query=${query}` : ''}`;
        return this.http.get<any>(url).pipe(
            map(response => response.urls.regular)
        );
    }

    getImageBypassApikey(topic: string = "art", width: number = 800, height: number = 600) {
        const randomSeed = Math.floor(Math.random() * 1000);
        return `https://source.unsplash.com/random/${width}x${height}?${topic}&sig=${randomSeed}`;
    }
}
