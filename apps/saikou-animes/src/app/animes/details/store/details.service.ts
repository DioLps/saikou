import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailsPayload } from './details.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private endpoint = 'http://localhost:3000/anime';
  constructor(private httpClient: HttpClient) {}

  public getAnimeEpisodes(params: DetailsPayload) {
    return this.httpClient.get(
      this.endpoint + `/episodes/${params.slug}/${params.page}`
    );
  }
}
