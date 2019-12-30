import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private endpoint = 'http://localhost:3000/episode';
  constructor(private httpClient: HttpClient) {}

  public getAnimeEpisode(slug: string) {
    return this.httpClient.get(this.endpoint + `/${slug}`);
  }
}
