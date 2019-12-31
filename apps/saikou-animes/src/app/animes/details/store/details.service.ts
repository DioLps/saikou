import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private endpoint = 'http://localhost:3000/anime';
  constructor(private httpClient: HttpClient) {}

  public getAnimeEpisodes(params: { slug: string; page?: number }) {
    return this.httpClient.get(this.endpoint + `/episodes/${params.slug}/${params.page}`);
  }
}
