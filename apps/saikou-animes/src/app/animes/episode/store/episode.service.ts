import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private endpoint = 'http://localhost:3000/api/video';
  constructor(private httpClient: HttpClient) {}

  public getAnimeEpisode(slug: number) {
    return this.httpClient.get(this.endpoint + `/${slug}`);
  }
}
