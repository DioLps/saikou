import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnimesService {

  private endpoint = 'http://localhost:3000/anime';
  constructor(private httpClient: HttpClient) { }

  public getAnimesPaged(page?: number) {
    if (page) {
      return this.httpClient.get(this.endpoint + `/${page}`);
    }
    return this.httpClient.get(this.endpoint);
  }
}
