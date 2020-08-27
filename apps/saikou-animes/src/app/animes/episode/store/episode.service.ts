import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/saikou-animes/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private endpoint = environment.api_path + 'video';
  constructor(private httpClient: HttpClient) {}

  public getAnimeEpisode(slug: number) {
    return this.httpClient.get(`${this.endpoint}?slug=${slug}`);
  }
}
