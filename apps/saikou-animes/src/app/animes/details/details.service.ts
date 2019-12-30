import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private endpoint = 'http://localhost:3000/anime';
  constructor(private httpClient: HttpClient) {}

  public getAnimeDetails(slug: string) {
    return this.httpClient.get(this.endpoint + `/detail/${slug}`);
  }

  public getAnimeEpisodes(slug: string, page?: string) {
    return this.httpClient.get(this.endpoint + `/episodes/${slug}/${page}`);
  }
}
