import { Component } from '@angular/core';
import { AnimesService } from './animes.service';

export interface AnimesData {
  nextPage: number;
  animes: Array<{ title: string, slug: string, src: string }>
}

@Component({
  selector: 'saikou-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss']
})
export class AnimesComponent {

  public response: AnimesData = null;

  constructor(
    private aServ: AnimesService
  ) {
    this.aServ.getAnimesPaged().subscribe((anime: AnimesData) => {
      this.response = anime;
    });
  }

  public getNextPage(nextPage: number) {
    this.aServ.getAnimesPaged(nextPage).subscribe((anime: AnimesData) => {
      this.response.nextPage = anime.nextPage;
      this.response.animes.push(...anime.animes);
    });
  }


}
